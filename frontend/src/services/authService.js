import api from '../api/axios';

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

export const login = async (data) => {
  const response = await api.post(`${AUTH_URL}/api/v1/auth/login`, data);
  return response.data;
};

export const signup = async (data) => {
  const response = await api.post(`${AUTH_URL}/api/v1/auth/signup`, data);
  return response.data;
};

export const getCurrentUser = async () => {
  // Backend auth.py uses @router.post("/user-info")
  const response = await api.post(`${AUTH_URL}/api/v1/auth/user-info`);
  return response.data;
};

export const refreshToken = async (token) => {
  const response = await api.post(`${AUTH_URL}/api/v1/auth/refresh`, { token });
  return response.data;
};