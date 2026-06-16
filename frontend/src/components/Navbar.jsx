import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import { Menu, X, Leaf } from 'lucide-react';

function Navbar() {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive(path)
        ? 'text-emerald-700 bg-emerald-50'
        : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50'
    }`;

  const mobileLinkClass = (path) =>
    `block px-4 py-2.5 rounded-lg text-base font-medium transition ${
      isActive(path)
        ? 'text-emerald-700 bg-emerald-50 font-semibold'
        : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50'
    }`;

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-emerald-700 hover:opacity-90 transition">
          <Leaf className="w-7 h-7 text-emerald-600 animate-pulse" />
          <span className="font-serif tracking-tight font-extrabold bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
            CastorOil
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className={linkClass('/')}>
            Home
          </Link>
          <Link to="/shop" className={linkClass('/shop')}>
            Shop
          </Link>
          {isAuthenticated && (
            <Link to="/my-orders" className={linkClass('/my-orders')}>
              My Orders
            </Link>
          )}
          <Link to="/contact" className={linkClass('/contact')}>
            Contact
          </Link>
        </div>

        {/* Desktop Buttons / Dropdown */}
        <div className="hidden md:flex gap-4 items-center">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 border border-emerald-200 hover:border-emerald-300 rounded-xl transition hover:bg-emerald-50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition shadow-md hover:shadow-lg"
              >
                Signup
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          {isAuthenticated && <ProfileDropdown />}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-500 hover:text-emerald-600 focus:outline-none p-1.5 rounded-lg border border-gray-100 hover:bg-gray-50"
            aria-expanded="false"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 border-t border-emerald-100/50 bg-white/95 backdrop-blur-md space-y-2 animate-in slide-in-from-top duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileLinkClass('/')}
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileLinkClass('/shop')}
          >
            Shop
          </Link>
          {isAuthenticated && (
            <Link
              to="/my-orders"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileLinkClass('/my-orders')}
            >
              My Orders
            </Link>
          )}
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileLinkClass('/contact')}
          >
            Contact
          </Link>

          {!isAuthenticated && (
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 text-emerald-700 border border-emerald-200 rounded-xl hover:bg-emerald-50 transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-emerald-600 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition shadow-md font-medium"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;