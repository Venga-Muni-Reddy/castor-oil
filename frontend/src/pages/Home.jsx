import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sprout, 
  Truck, 
  ShieldCheck, 
  CreditCard, 
  ShoppingBag, 
  Settings, 
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Star,
  Quote
} from 'lucide-react';

function Home() {
  const { isAuthenticated } = useAuth();

  const testimonials = [
    {
      name: 'Aarav Sharma',
      role: 'Organic Haircare Formulator',
      text: 'The quality of this cold-pressed castor oil is unmatched. I use it for all my products, and my clients love the results. Directly supporting farmers makes it even better!',
      rating: 5,
    },
    {
      name: 'Priya Patel',
      role: 'Home Remedy Enthusiast',
      text: 'I use it as an overnight moisturizer and for hair growth. You can smell the purity. It has none of that heavy chemical scent that store-bought oils do. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Rohan Deshmukh',
      role: 'Wellness Coach',
      text: 'Finding authentic, hexane-free castor oil was difficult until I found CastorOil. Knowing it is village-produced gives me peace of mind. Excellent and fast delivery!',
      rating: 5,
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-emerald-100/50 to-gray-50 py-20 md:py-32">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                <Sprout className="w-3.5 h-3.5" /> Direct Farmer Co-op
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight font-serif">
                Premium <span className="text-emerald-600 block">Castor Oil</span> Direct From Farmers
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Pure, Natural and Cold Pressed Castor Oil Delivered To Your Doorstep
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                {!isAuthenticated ? (
                  <Link
                    to="/signup"
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3.5 rounded-xl transition shadow-md hover:shadow-lg text-base"
                  >
                    Get Started <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link
                    to="/shop"
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3.5 rounded-xl transition shadow-md hover:shadow-lg text-base"
                  >
                    Order Now <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
                <Link
                  to="/shop"
                  className="flex items-center justify-center gap-2 border border-emerald-600 text-emerald-700 font-medium px-8 py-3.5 rounded-xl hover:bg-emerald-50 transition text-base"
                >
                  Explore Products
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur opacity-30 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800"
                alt="Organic farming seeds and oils"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[320px] sm:h-[400px] border border-emerald-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="py-20 bg-white border-y border-emerald-100/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900">
              Why Choose Our Castor Oil?
            </h2>
            <p className="text-gray-600">
              We focus on purity, traditional farming methods, and supporting rural livelihoods.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 transition hover:shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900">100% Natural</h3>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                Cold-pressed from organically grown castor seeds. No chemicals, hexane, or artificial preservatives.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 transition hover:shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900">Village Produced</h3>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                Extracted locally in our village-based cooperative mills using time-honored traditional techniques.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 transition hover:shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                Carefully packaged in eco-friendly bottles and shipped fast, ensuring the freshness remains intact.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 transition hover:shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900">Secure Payments</h3>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                Pay safely using Stripe checkout. Quick, automated invoice confirmations and full tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 to-emerald-950 text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-emerald-500 rounded-3xl blur opacity-25"></div>
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
                alt="Village Farming fields"
                className="relative rounded-3xl shadow-xl w-full h-[350px] object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <span className="text-emerald-400 font-semibold text-sm tracking-wide uppercase">
                Our Story & Legacy
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif">
                Direct From Village Farms To Your Doorstep
              </h2>
              <p className="text-emerald-100/80 leading-relaxed text-base">
                We are a dedicated village-based Castor Oil collective. Our seeds are harvested by hand by local farmers who have cultivated castor crops for generations. 
              </p>
              <p className="text-emerald-100/80 leading-relaxed text-base">
                By setting up our cold-press extraction mills right within the village, we eliminate middle-men, ensuring that farmers receive fair, sustainable wages while you receive the absolute freshest, untouched oil.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-xl transition"
                >
                  Visit Our Cooperatives <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900">
              The Journey of Your Bottle
            </h2>
            <p className="text-gray-600">
              How we bring premium, organic cold-pressed castor oil from the soil to your shelf.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center space-y-4 relative">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold shadow-sm">
                1
              </div>
              <h3 className="font-bold text-lg text-gray-900">Place Order</h3>
              <p className="text-gray-600 text-sm max-w-xs mx-auto">
                Select your required quantity in litres and choice of delivery date on our shop page.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold shadow-sm">
                2
              </div>
              <h3 className="font-bold text-lg text-gray-900">Make Payment</h3>
              <p className="text-gray-600 text-sm max-w-xs mx-auto">
                Pay securely using Stripe. Your payment status will instantly update to PAID.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold shadow-sm">
                3
              </div>
              <h3 className="font-bold text-lg text-gray-900">Processing</h3>
              <p className="text-gray-600 text-sm max-w-xs mx-auto">
                Our cooperative mills prepare, clean-filter, pack, and quality-check your fresh oil bottle.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold shadow-sm">
                4
              </div>
              <h3 className="font-bold text-lg text-gray-900">Delivery</h3>
              <p className="text-gray-600 text-sm max-w-xs mx-auto">
                Dispatched directly to your address, fresh and ready to soothe your skin, hair, and health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-20 bg-emerald-50/50 border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900">
              Loved By Wellness Lovers
            </h2>
            <p className="text-gray-600">
              Read real customer feedback about our agricultural-sourced cold-pressed castor oil.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100/30 flex flex-col justify-between relative">
                <Quote className="absolute top-4 right-4 w-10 h-10 text-emerald-50/70" />
                <div className="space-y-4 relative z-10">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic text-sm leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                    <p className="text-emerald-700 text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact Section */}
      <section className="bg-white py-20 border-t border-emerald-100/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900">
              Come Visit Us
            </h2>
            <p className="text-gray-600">
              Have questions? Connect with our team or drop by our village cooperative.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-2xl text-center space-y-3 border border-gray-100">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 flex items-center justify-center rounded-xl mx-auto">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Cooperative Address</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Village Seeds Union, Extraction Unit 2, Andhra Pradesh, India
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl text-center space-y-3 border border-gray-100">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 flex items-center justify-center rounded-xl mx-auto">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Phone Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                +91 98765 43210 <br /> Mon-Sat (9am - 6pm)
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl text-center space-y-3 border border-gray-100">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 flex items-center justify-center rounded-xl mx-auto">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900">E-mail</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                support@castoroil.com <br /> we reply in 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      {!isAuthenticated && (
        <section className="bg-emerald-700 py-16 text-center text-white border-t border-emerald-800">
          <div className="max-w-4xl mx-auto px-6 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-serif">
              Ready To Order Premium Castor Oil?
            </h2>
            <p className="text-emerald-100/90 text-base max-w-xl mx-auto leading-relaxed">
              Join hundreds of satisfied customers who trust our village-made products. Sign up now to make your first purchase.
            </p>
            <div>
              <Link
                to="/signup"
                className="inline-block bg-white text-emerald-850 hover:bg-emerald-50 px-8 py-3.5 rounded-xl font-semibold transition shadow-md hover:shadow-lg text-base"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

export default Home;