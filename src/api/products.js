import axiosInstance from './axios';

export function getProducts() {
  return axiosInstance().get('/products');
}
