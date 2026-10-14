import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
const apiUrl = configuredApiUrl
  || (import.meta.env.DEV
    ? 'http://localhost:8081'
    : 'https://campus-skill-exchange-backend-xzav.onrender.com');
const normalizedApiUrl = apiUrl.replace(/\/+$/, '');
const apiBaseUrl = normalizedApiUrl.endsWith('/api')
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api`;

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const storedAuth = localStorage.getItem('campusAuth');
  if (storedAuth) {
    const { email, password } = JSON.parse(storedAuth);
    if (email && password) {
      config.headers.Authorization = 'Basic ' + window.btoa(`${email}:${password}`);
    }
  }
  return config;
});

export default api;
