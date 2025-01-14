import axios from 'axios';
import { Cookies } from "react-cookie";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Optional: Add request/response interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    const cookie = (new Cookies).get("access_token");
    if (cookie) {
      config.headers["Authorization"] = `Bearer ${cookie}`;
    }
    return config;
  },
  // (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return error.response;
    // return Promise.reject(error);
  }
);

export default axiosInstance;