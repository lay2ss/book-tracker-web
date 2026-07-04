import axios from "axios";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const api = axios.create({
  baseURL: VITE_API_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response, 
  (error) => {

    if (error.response && error.response.status === 401) {
      console.warn("Token expired or invalid. Logging out...");

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.removeItem("recent_book_searches");

      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);