import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo & Description */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white">
              <Leaf className="w-7 h-7 text-emerald-400" />
              <span className="font-serif tracking-tight font-extrabold">
                CastorOil
              </span>
            </Link>
            <p className="text-emerald-200/80 leading-relaxed text-sm max-w-sm">
              We extract 100% natural, cold-pressed castor oil directly in our village. 
              By partnering with local farmers, we deliver high-quality, pure organic oil 
              while supporting sustainable agricultural practices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold tracking-wider uppercase text-xs">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white hover:underline transition">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white hover:underline transition">
                  Explore Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold tracking-wider uppercase text-xs">
              Farmer Connect
            </h3>
            <ul className="space-y-3 text-sm text-emerald-200/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  Farmer Cooperative Society,<br />
                  Village extraction unit,<br />
                  Andhra Pradesh, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:support@castoroil.com" className="hover:text-white hover:underline">
                  support@castoroil.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-emerald-900 my-10"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-300/70">
          <p>© {new Date().getFullYear()} Castor Oil Farmer Cooperative. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> in rural Andhra Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;