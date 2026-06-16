import { useState, useEffect } from 'react';
import { getMyOrders } from '../services/orderService';
import { createCheckout } from '../services/paymentService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';
import { 
  ShoppingBag, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  Package, 
  Truck, 
  XCircle,
  ExternalLink,
  Calendar,
  AlertCircle
} from 'lucide-react';

const PRICE_PER_LITRE = 250; // Constant price in INR per litre

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoadingId, setCheckoutLoadingId] = useState(null);
  const { isAuthenticated } = useAuth();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getMyOrders();
      // Backend returns { message: "...", orders: [...] }
      setOrders(res?.orders || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load orders. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  // Calculate order amount fallback
  const getOrderAmount = (order) => {
    // If order.total_amount is 0 (backend initializes at 0), calculate it based on quantity
    if (!order.total_amount || order.total_amount === 0) {
      return order.quantity_litres * PRICE_PER_LITRE;
    }
    return order.total_amount;
  };

  const handlePayNow = async (order) => {
    try {
      setCheckoutLoadingId(order.id);
      const amountToPay = getOrderAmount(order);
      
      // Call Payment service checkout endpoint:
      // Request body: { order_id, amount }
      const res = await createCheckout({
        order_id: order.id,
        amount: amountToPay,
      });

      // Response contains checkout_url
      if (res && res.checkout_url) {
        toast.loading('Redirecting to secure Stripe payment...');
        window.location.href = res.checkout_url;
      } else {
        throw new Error('Stripe checkout URL missing from response');
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        'Payment initiation failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setCheckoutLoadingId(null);
    }
  };

  const getStatusBadge = (statusStr) => {
    const s = String(statusStr || 'pending').toLowerCase();
    
    switch (s) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            <CheckCircle className="w-3.5 h-3.5" /> Paid
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 animate-pulse">
            <Package className="w-3.5 h-3.5" /> Processing
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <Truck className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'cancelled':
      case 'cancelled_status':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
    }
  };

  // Helper to safely format dates
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not set';
    try {
      // Handles both ISO date formats (e.g. YYYY-MM-DD or datetime)
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-serif text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-emerald-600" />
              My Orders
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Track and pay for your village-sourced castor oil orders.
            </p>
          </div>
          <button
            onClick={fetchOrders}
            className="text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 px-4 py-2.5 rounded-xl border border-emerald-100 transition"
          >
            Refresh Orders List
          </button>
        </div>

        {orders.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900">No Orders Found</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                You haven't placed any orders yet. Visit our shop and get premium castor oil direct from local village farmers.
              </p>
            </div>
            <a
              href="/shop"
              className="inline-block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition shadow-md hover:shadow-lg text-sm"
            >
              Order Now
            </a>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Quantity (Litres)</th>
                    <th className="px-6 py-4">Delivery Date</th>
                    <th className="px-6 py-4">Total Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {orders.map((order) => {
                    const orderStatus = order.order_status || order.status || 'pending';
                    const displayAmount = getOrderAmount(order);
                    const isPending = String(orderStatus).toLowerCase() === 'pending';

                    return (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4 font-mono text-xs text-gray-500">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {order.quantity_litres} L
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {formatDate(order.delivary_date || order.delivery_date)}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-emerald-800">
                          ₹{displayAmount}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(orderStatus)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {isPending && (
                            <button
                              onClick={() => handlePayNow(order)}
                              disabled={checkoutLoadingId === order.id}
                              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition shadow-sm hover:shadow disabled:opacity-50"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              {checkoutLoadingId === order.id ? 'Connecting...' : 'Pay Now'}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden space-y-4">
              {orders.map((order) => {
                const orderStatus = order.order_status || order.status || 'pending';
                const displayAmount = getOrderAmount(order);
                const isPending = String(orderStatus).toLowerCase() === 'pending';

                return (
                  <div
                    key={order.id}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4 hover:border-emerald-200 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-xxs font-mono text-gray-400">Order ID: {order.id}</p>
                        <p className="font-bold text-gray-900 text-lg">{order.quantity_litres} Litres</p>
                      </div>
                      <div>{getStatusBadge(orderStatus)}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-100 text-xs">
                      <div>
                        <span className="text-gray-400 block mb-0.5">Delivery Date</span>
                        <span className="font-medium text-gray-700 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {formatDate(order.delivary_date || order.delivery_date)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-0.5">Total Price</span>
                        <span className="font-extrabold text-emerald-800 text-sm">₹{displayAmount}</span>
                      </div>
                    </div>

                    {isPending && (
                      <button
                        onClick={() => handlePayNow(order)}
                        disabled={checkoutLoadingId === order.id}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition shadow-md disabled:opacity-50 text-sm"
                      >
                        <CreditCard className="w-4 h-4" />
                        {checkoutLoadingId === order.id ? 'Connecting to Stripe...' : 'Pay Now'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Note block */}
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex items-start gap-2.5 max-w-3xl">
              <AlertCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-850 leading-relaxed">
                <span className="font-semibold block mb-0.5">Payment Instructions</span>
                When you click "Pay Now", you will be redirected to the secure Stripe Checkout gateway. You can use test cards to simulate successful purchases. Upon successful payment, your status will instantly transition to <strong>Paid</strong>.
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default MyOrders;
