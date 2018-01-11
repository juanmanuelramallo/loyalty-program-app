import axiosInstance from './axios';

export function getProducts() {
  return axiosInstance().get('/products');
}

export function redeem(product) {
  return axiosInstance().post('/redeem', { productId: product._id });
}
