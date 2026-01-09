const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

// Helper function to make API requests
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token && !options.headers?.hasOwnProperty('Authorization')) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error');
  }
}

// Auth API calls
export const authAPI = {
  signup: async (userData: {
    name: string;
    email: string;
    password: string;
    profileImage?: string;
  }) => {
    return fetchAPI('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getCurrentUser: async () => {
    return fetchAPI('/auth/me', {
      method: 'GET',
    });
  },

  updateProfile: async (userData: {
    userId?: string,
    name?: string;
    email?: string;
    profileImage?: string;
  }) => {
    return fetchAPI('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  refreshToken: async (refreshToken: string) => {
    return fetchAPI('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  logout: async () => {
    return fetchAPI('/auth/logout', {
      method: 'POST',
    });
  },
};

// User Mode API calls
export const userModeAPI = {
  createUserMode: async (userModeData: { userId: string; overallMood: string; journalEntry: string; feelings: string[]; sleepHours: number }) => {
    return fetchAPI('/user-mode/create', {
      method: 'POST',
      body: JSON.stringify(userModeData),
    });
  },
  getUserMode: async (userId: string) => {
    return fetchAPI(`/user-mode/get/${userId}`, {
      method: 'GET',
    });
  },
  updateUserProfile: async (userData: { userId: string, name: string }) => {
    return fetchAPI('/user/update', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
};

export default fetchAPI;


