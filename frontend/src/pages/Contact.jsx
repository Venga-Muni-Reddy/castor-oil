import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast.success('Thank you for contacting us! We will reply soon.');
      setFormData({ name: '', email: '', message: '' });
      setSending(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-900">
            Contact Our Cooperative
          </h1>
          <p className="text-gray-600">
            Have questions about our cold-pressed extraction process or bulk orders? 
            Drop us a line and we'll get back to you!
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10 bg-white shadow-xl rounded-2xl overflow-hidden border border-emerald-100/30">
          
          {/* Contact Details */}
          <div className="md:col-span-2 bg-emerald-900 text-white p-8 md:p-12 flex flex-col justify-between space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-serif">Get in Touch</h2>
              <p className="text-emerald-100/80 leading-relaxed text-sm">
                We are based in a traditional farming village. Drop by to witness our cold-pressed extraction mill.
              </p>
            </div>

            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Farmer Cooperative Society,<br />
                  Village extraction unit,<br />
                  Andhra Pradesh, India
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>support@castoroil.com</span>
              </li>
            </ul>

            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <HelpCircle className="w-4 h-4" />
              <span>We usually reply within 24 hours.</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 p-8 md:p-12 space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Send an Inquiry</h3>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Your Message</label>
              <textarea
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your query here..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 text-sm resize-none"
                required
              ></textarea>
            </div>

            <button
              disabled={sending}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg text-sm w-full sm:w-auto disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Message'}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
