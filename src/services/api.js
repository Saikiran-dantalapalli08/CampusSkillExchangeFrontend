import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
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
