import { Link } from 'react-router-dom';
import { Leaf, ArrowLeft } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50/50 py-12 px-6 text-center space-y-6">
      <div className="relative">
        <Leaf className="w-20 h-20 text-emerald-100 fill-emerald-500/10 mx-auto" />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-extrabold text-emerald-800">
          404
        </span>
      </div>
      
      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-bold font-serif text-gray-900">
          Page Not Harvested
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          The page you are looking for might have been moved, deleted, or never existed in our fields. Let's get you back to the cooperative home page!
        </p>
      </div>

      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl transition shadow-md hover:shadow-lg text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
