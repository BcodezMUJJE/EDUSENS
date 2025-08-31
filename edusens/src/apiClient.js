import axios from 'axios';

// Axios instance with base URL (configurable via environment variable)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:5000/api',
  timeout: 10000,
});

export const getTest = async () => {
  const res = await api.get('/test');
  return res.data;
};

export default api;
