import axiosInstance from './axios';

export function getUser() {
  return axiosInstance().get('/user/me');
}

export function addPoints() {
  return axiosInstance().post('/user/points', { amount: 1000 });
}
