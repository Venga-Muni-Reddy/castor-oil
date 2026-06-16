import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import { Leaf, LogIn } from 'lucide-react';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      toast.success('Welcome back! Login successful.');
      navigate('/');
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        'Invalid credentials. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-emerald-100/50">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2 text-3xl font-bold text-emerald-700">
            <Leaf className="w-8 h-8 text-emerald-600" />
            <span className="font-serif tracking-tight font-extrabold">CastorOil</span>
          </Link>
          <p className="text-gray-500 text-sm">
            Sign in to purchase cold-pressed organic castor oil
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
          <InputField
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            register={(name) =>
              register(name, {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address format',
                },
              })
            }
            errors={errors}
          />

          <InputField
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
            register={(name) =>
              register(name, {
                required: 'Password is required',
              })
            }
            errors={errors}
          />

          <div className="pt-2">
            <SubmitButton title="Login" loading={loading} />
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          New to our platform?{' '}
          <Link to="/signup" className="text-emerald-600 font-semibold hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;