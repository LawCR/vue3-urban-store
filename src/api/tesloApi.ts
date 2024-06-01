import axios from 'axios';

const tesloApi = axios.create({
  baseURL: import.meta.env.VITE_TESLO_API_URL,
});

// Interceptors
tesloApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

tesloApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized - Logout');
      localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export { tesloApi };
