import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, ShoppingBag, ShieldCheck } from 'lucide-react';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) return null;

  // Get user initials for placeholder avatar
  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-full p-0.5"
      >
        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold text-sm hover:bg-emerald-700 transition shadow-sm border border-emerald-500">
          {initials}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl py-2 z-50 border border-gray-100 transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2 duration-100">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
            <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
            {user.role === 'owner' && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xxs font-medium bg-emerald-100 text-emerald-800 mt-1.5 gap-1 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Owner Mode
              </span>
            )}
          </div>

          <div className="p-1">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition gap-2"
            >
              <User className="w-4 h-4 text-emerald-600" />
              My Profile
            </Link>

            <Link
              to="/my-orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              My Orders
            </Link>

            <div className="border-t border-gray-100 my-1"></div>

            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
