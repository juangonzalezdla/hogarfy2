import axios from 'axios';

const authAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
  withCredentials: true
});

const productAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/product`,
  withCredentials: true
});

const categoryAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/category`,
  withCredentials: true
});

const orderAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/order`,
  withCredentials: true
});

export { authAxios, productAxios, categoryAxios, orderAxios };