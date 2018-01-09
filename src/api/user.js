import axiosInstance from './axios';

export function getUser() {
  return axiosInstance().get('/user/me');
}
