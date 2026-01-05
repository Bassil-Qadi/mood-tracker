import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { authAPI } from '../utils/api';

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
}

type AuthResponse = { user: User; accessToken: string; refreshToken: string };
type CurrentUserResponse = { user: User };

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, profileImage?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: { name?: string; email?: string; profileImage?: string }) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Check for existing user on mount
  useEffect(() => {
    const initAuth = async () => {
      // hydrate from localStorage to avoid UI flicker on refresh
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error('Failed to parse stored user', err);
          localStorage.removeItem('user');
        }
      }

      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await authAPI.getCurrentUser() as { success: boolean; data?: CurrentUserResponse };
          if (response.success && response.data) {
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
        } catch (err) {
          // Token might be expired, clear it
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signup = async (name: string, email: string, password: string, profileImage?: string) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authAPI.signup({ name, email, password, profileImage }) as { success: boolean; data?: AuthResponse };
      
      if (response.success && response.data) {
        setUser(response.data.user);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authAPI.login({ email, password }) as { success: boolean; data?: AuthResponse };
      
      if (response.success && response.data) {
        setUser(response.data.user);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  };

  const updateProfile = async (userData: { name?: string; email?: string; profileImage?: string }) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authAPI.updateProfile(userData) as { success: boolean; data?: CurrentUserResponse };
      
      if (response.success && response.data) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Profile update failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        login, 
        signup, 
        logout, 
        updateProfile, 
        isAuthenticated 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

