import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import logo from '../assets/images/logo.svg';
import avatarPlaceholder from '../assets/images/avatar-placeholder.svg';

function SignUp() {

  const { signup, error } = useAuth();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const router = useNavigate();

  const handleNextStep = () => {
    setStep(step + 1);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    setIsLoading(true);
    
    try {
      await signup(name, email, password, profileImage || undefined);
      router('/home');
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-10 bg-gray-50">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
        {step === 0 && <div>
          <h2 className="text-start text-3xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-start text-sm text-gray-600">
            Join to track your daily mood and sleep with ease.
          </p>
        </div>}
        {step === 1 && <div>
          <h2 className="text-start text-3xl font-bold text-gray-900">
            Personalize your experience
          </h2>
          <p className="mt-2 text-start text-sm text-gray-600">
          Add your name and a profile picture to make Mood yours.
          </p>
        </div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
         {(error || localError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error || localError}
            </div>
          )}
         {step === 0 && <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Create a password"
              />
            </div>
          </div>}
          {step === 1 && <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Profile picture
              </label>
              <div className="flex items-center gap-6">
                {/* Avatar Preview */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100">
                    <img
                      src={profileImage || avatarPlaceholder}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {profileImage && (
                    <button
                      type="button"
                      onClick={() => setProfileImage(null)}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Upload Button */}
                <div className="flex-1">
                  <input
                    id="profile-picture"
                    name="profile-picture"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="profile-picture"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Choose photo
                  </label>
                  <p className="mt-2 text-xs text-gray-500">
                    JPG, PNG or GIF (max. 5MB)
                  </p>
                </div>
              </div>
            </div>
          </div>}
          <div>
          {step === 0 && <button
              type="button"
              onClick={handleNextStep}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign up
            </button>}

            {step === 1 && (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating account...' : 'Start tracking'}
              </button>
            )}

          </div>
          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

