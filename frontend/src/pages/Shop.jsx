import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';
import { toast } from 'react-hot-toast';
import { Sprout, ShoppingBag, Calendar, ShieldCheck, HelpCircle } from 'lucide-react';

const PRICE_PER_LITRE = 250; // Constant price in INR per litre

function Shop() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Set default delivery date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2); // 2 days for village processing/delivery
  const defaultDeliveryDate = tomorrow.toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity_litres: 1,
      delivary_date: defaultDeliveryDate,
    },
  });

  // Watch quantity to calculate total amount dynamically
  const quantity = watch('quantity_litres', 1);
  const parsedQuantity = parseFloat(quantity) || 0;
  const totalAmount = parsedQuantity * PRICE_PER_LITRE;

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const qty = parseFloat(data.quantity_litres);
      if (isNaN(qty) || qty <= 0) {
        toast.error('Please enter a valid quantity.');
        return;
      }

      // Backend expects: { quantity_litres: float, delivary_date: date (string YYYY-MM-DD) }
      // NOTE the spelling of 'delivary_date' matches the backend schema!
      await createOrder({
        quantity_litres: qty,
        delivary_date: data.delivary_date,
      });

      toast.success('Order placed successfully! Proceeding to payment.');
      navigate('/my-orders');
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        'Failed to create order. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-900">
            Cooperative Shop
          </h1>
          <p className="text-gray-600">
            Order premium, cold-pressed castor oil prepared directly by our village cooperative.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Showcase */}
          <div className="md:col-span-7 bg-white p-6 md:p-8 shadow-md rounded-2xl border border-emerald-100/50 space-y-6">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-emerald-50">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800"
                alt="Cold-Pressed Castor Oil Bottle"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-emerald-600 text-white font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Fresh Stock
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                100% Pure Cold-Pressed Castor Oil
              </h2>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-full text-emerald-800">
                  <Sprout className="w-3.5 h-3.5" /> Hexane Free
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-full text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" /> Chemical Free
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-full text-emerald-800">
                  🌱 Organic Farming
                </span>
              </div>
              
              <div className="border-t border-gray-100 pt-4 text-gray-600 text-sm leading-relaxed space-y-2">
                <p>
                  Our castor seeds are carefully selected and cold-pressed in traditional stone extractors. Cold pressing ensures that the vital nutrients, fatty acids, and minerals of the oil remain entirely intact.
                </p>
                <p className="font-semibold text-emerald-800">
                  Best For: Hair growth nourishment, skin hydration, eyebrow strengthening, and joints massage.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:col-span-5 bg-white p-6 md:p-8 shadow-md rounded-2xl border border-emerald-100/50 space-y-6"
          >
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Configure Order
            </h3>

            {/* Price Per Litre */}
            <div className="flex justify-between items-center bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/30">
              <span className="text-sm text-emerald-850 font-medium">Price Per Litre</span>
              <span className="text-xl font-bold text-emerald-700">₹{PRICE_PER_LITRE}</span>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Quantity (Litres)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  placeholder="Enter quantity"
                  {...register('quantity_litres', {
                    required: 'Quantity is required',
                    min: { value: 1, message: 'Minimum order is 1 Litre' },
                  })}
                  className="w-full rounded-lg border border-gray-300 pl-4 pr-12 py-3 outline-none focus:border-emerald-500 text-sm font-medium"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-semibold">
                  L
                </span>
              </div>
              {errors.quantity_litres && (
                <p className="text-red-500 text-xs">{errors.quantity_litres.message}</p>
              )}
            </div>

            {/* Delivery Date */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" /> Requested Delivery Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                {...register('delivary_date', {
                  required: 'Delivery date is required',
                })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 text-sm font-medium"
              />
              {errors.delivary_date && (
                <p className="text-red-500 text-xs">{errors.delivary_date.message}</p>
              )}
            </div>

            {/* Summary details */}
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Calculated Volume</span>
                <span>{parsedQuantity} Litre(s)</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping Fees</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2 font-bold text-gray-900 text-base">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingBag className="w-5 h-5" />
              {loading ? 'Submitting Order...' : 'Place Order'}
            </button>

            <div className="flex items-center gap-1.5 text-xxs text-gray-400 justify-center">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Payments are processed securely via Stripe.</span>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Shop;
