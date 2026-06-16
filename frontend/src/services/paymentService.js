import api from '../api/axios';

const PAYMENT_URL = import.meta.env.VITE_PAYMENT_URL;

export const createCheckout = async (paymentData) => {
  // paymentData should match backend CheckoutRequest schema:
  // { order_id: str, amount: float }
  const response = await api.post(`${PAYMENT_URL}/api/v1/payment/checkout`, paymentData);
  return response.data;
};
