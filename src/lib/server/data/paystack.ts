import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY as string;

const paystackApi = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const getProductById = async (productId: string) => {
  try {
    const response = await paystackApi.get(`/product/${productId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getTransactionDetails = async (transactionId: string) => {
  try {
    const response = await paystackApi.get(`/transaction/${transactionId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    throw error;
  }
};

export const getCustomer = async (customerId: string) => {
  try {
    const response = await paystackApi.get(`/customer/${customerId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};