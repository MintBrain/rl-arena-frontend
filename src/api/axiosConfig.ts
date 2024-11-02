import axios from 'axios';

const api = axios.create({
  baseURL: 'https://httpbin.org/api/',
  withCredentials: true,
})

export default api;