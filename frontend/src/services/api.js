import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || ' ',
  headers: { 'Content-Type': 'application/json' },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the error details before redirect
    console.error('🔴 API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    if (error.response?.status === 401) {
      // Do NOT redirect yet – just log
      // localStorage.removeItem('token');
      // window.location.href = '/login';
      // Instead, throw the error so the calling code can handle it
    }
    return Promise.reject(error);
  }
);

export default api;