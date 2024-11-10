import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: import.meta.env.__API_URL__,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Optional: Add request/response interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // Handle token or custom headers here if needed
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors (e.g., unauthorized, etc.)
    return Promise.reject(error);
  }
);

export default axiosInstance;