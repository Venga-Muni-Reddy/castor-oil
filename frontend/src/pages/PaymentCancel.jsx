import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, ShoppingBag } from 'lucide-react';

function PaymentCancel() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 border border-red-100/50 text-center space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Yellow/Red Warning icon */}
        <div className="relative w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-600">
          <AlertTriangle className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-gray-900">
            Payment Cancelled
          </h1>
          <p className="text-gray-500 text-xs leading-relaxed pt-2">
            The checkout session was closed, and no charge was made. Your order status remains pending, and you can try paying again whenever you are ready.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Link
            to="/my-orders"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg text-sm"
          >
            <ShoppingBag className="w-4 h-4" /> Try Again
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 border border-gray-255 text-gray-600 hover:bg-gray-50 font-semibold py-3 rounded-xl transition text-sm"
          >
            Return Home <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default PaymentCancel;
