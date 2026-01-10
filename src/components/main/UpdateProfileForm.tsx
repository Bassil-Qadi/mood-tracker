import { useState } from "react";
import { authAPI } from "../../utils/api";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

export default function UpdateProfileForm({ handleClose }: { handleClose: () => void }) {
    const { user } = useAuth();
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await authAPI.updateProfile({ userId: user?.id || '', name });
    if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }

      handleClose();
  }

  return (
    <div className="p-8 pt-2">
      <div className="update-form__header">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Update your profile</h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-500">
          Personalize your account with your name and photo.
        </p>
      </div>
      <div className="update-form__body mt-10">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm sm:text-base md:text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 appearance-none bg-transparent relative block w-full px-3 py-2 border border-gray-600 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your new name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm sm:text-base md:text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}
