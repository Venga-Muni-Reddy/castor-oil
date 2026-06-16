import api from '../api/axios';

const ORDER_URL = import.meta.env.VITE_ORDER_URL;

export const createOrder = async (orderData) => {
  // orderData should match backend OrderRequest schema:
  // { quantity_litres: float, delivary_date: date (string YYYY-MM-DD) }
  const response = await api.post(`${ORDER_URL}/api/v1/order/create-order`, orderData);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get(`${ORDER_URL}/api/v1/order/my-orders`);
  return response.data;
};
