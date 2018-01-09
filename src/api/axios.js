import axios from 'axios';

export default function axiosInstance() {
  const { token } = sessionStorage;
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });
}
