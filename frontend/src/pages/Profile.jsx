import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, ShieldAlert, LogOut, Calendar } from 'lucide-react';

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="py-12 text-center text-gray-500">
        Please login to view your profile.
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100/30">
          
          {/* Header Accent */}
          <div className="h-32 bg-gradient-to-r from-emerald-600 to-emerald-800"></div>

          {/* User Image Placeholder */}
          <div className="relative px-8 pb-6">
            <div className="absolute -top-12 left-8 w-24 h-24 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-3xl shadow-xl border-4 border-white">
              {initials}
            </div>

            <div className="pt-16 space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-emerald-700 text-sm font-medium">Verified Platform Member</p>
            </div>
          </div>

          {/* Details list */}
          <div className="p-8 border-t border-gray-100 space-y-6">
            <h2 className="text-lg font-bold text-gray-800">Profile Details</h2>

            <div className="grid sm:grid-cols-2 gap-6">
              
              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <User className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <span className="text-xxs text-gray-400 block uppercase font-bold">Full Name</span>
                  <span className="text-sm font-semibold text-gray-800 truncate block">{user.name}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <span className="text-xxs text-gray-400 block uppercase font-bold">Email Address</span>
                  <span className="text-sm font-semibold text-gray-800 truncate block">{user.email}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <ShieldAlert className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <span className="text-xxs text-gray-400 block uppercase font-bold">System Role</span>
                  <span className="text-sm font-semibold text-emerald-800 uppercase tracking-wide truncate block">{user.role || 'User'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <Calendar className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <span className="text-xxs text-gray-400 block uppercase font-bold">Joined Cooperatives</span>
                  <span className="text-sm font-semibold text-gray-800 truncate block">June 2026</span>
                </div>
              </div>

            </div>

            {/* Logout Action */}
            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-650 font-semibold py-3 rounded-xl transition text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout from Account
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;
