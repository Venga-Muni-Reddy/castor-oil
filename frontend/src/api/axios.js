import axios from 'axios';

const api = axios.create({
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if error is 401 (Unauthorized) and we haven't retried this request yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshTokenVal = localStorage.getItem('refresh_token');
      if (!refreshTokenVal) {
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const AUTH_URL = import.meta.env.VITE_AUTH_URL;
        // Call refresh endpoint with raw axios to prevent loop
        const response = await axios.post(`${AUTH_URL}/api/v1/auth/refresh`, {
          token: refreshTokenVal,
        });

        // Backend nests token: success_response({ "status_code": 200, "message": "...", "data": { "token": token } })
        // parses to response.data.data.data.token or fallback response.data.data.token
        const newAccessToken = response.data?.data?.data?.token || response.data?.data?.token;

        if (newAccessToken) {
          localStorage.setItem('access_token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          return api(originalRequest);
        } else {
          throw new Error('Refresh token response missing access token');
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Clear local storage and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Prevent redirects on initial load if route doesn't require it, 
        // but for API errors, it's safer to clear and go to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;