import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login as apiLogin } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // api/axios automatically attaches the token and handles automatic refresh on 401
      const res = await getCurrentUser();
      // res schema has user object (since backend auth.py returns current_user, 
      // wait, is it returned raw or wrapped?
      // In auth.py fetch_user_info: return current_user.
      // So fetch_user_info returns the user object directly, OR wraps it?
      // Wait, fetch_user_info does not use success_response! It just returns `current_user`.
      // Let's verify auth.py line 49:
      // @router.post("/user-info")
      // def fetch_user_info(current_user: User = Depends(get_current_user)):
      //         return current_user
      // So it returns the User object directly, containing name, email, role, etc.
      // Thus, res is the user object directly!
      if (res && (res.email || res.id)) {
        setUser(res);
        setIsAuthenticated(true);
      } else {
        throw new Error('User data is invalid');
      }
    } catch (err) {
      console.error('Failed to load user info', err);
      // Clear storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    // Call API login
    const res = await apiLogin({ email, password });
    // Response schema is wrapped in success_response: 
    // res = { success: true, message: "Login Success", data: { user, access_token, refresh_token } }
    const authData = res?.data;
    if (authData && authData.access_token) {
      localStorage.setItem('access_token', authData.access_token);
      localStorage.setItem('refresh_token', authData.refresh_token);
      setUser(authData.user);
      setIsAuthenticated(true);
      return authData.user;
    } else {
      throw new Error('Invalid login response');
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
