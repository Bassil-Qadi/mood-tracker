import React, { useState, useRef, useEffect } from 'react';

interface UserProps {
  name: string;
  email: string;
  profileImage: string;
}

interface DropdownProps {
  user: UserProps;
  onLogout: () => void;
  onSettings: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ user, onLogout, onSettings }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-md focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <img
          src={user.profileImage || ''}
          alt={user.name}
          className="w-8 h-8 rounded-full border"
        />
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border z-10">
          <div className="px-4 py-3 border-b">
            <div className="font-semibold text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={(e) => {
                setOpen(false);
                onSettings();
              }}
              type="button"
            >
              Settings
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={(e) => {
                setOpen(false);
                onLogout();
              }}
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
