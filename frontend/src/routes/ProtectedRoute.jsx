import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // If AuthContext is checking token validity on start, display a spinner
  if (loading) {
    return <Loader fullPage />;
  }

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;