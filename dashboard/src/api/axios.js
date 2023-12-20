import axios from 'axios';

const authAxios = axios.create({
  baseURL: `http://localhost:5174/api/auth`,
  withCredentials: true
});

const productAxios = axios.create({
  baseURL: `http://localhost:5174/api/product`,
  withCredentials: true
});

const categoryAxios = axios.create({
  baseURL: `http://localhost:5174/api/category`,
  withCredentials: true
});

const orderAxios = axios.create({
  baseURL: `http://localhost:5174/api/order`,
  withCredentials: true
});

export { authAxios, productAxios, categoryAxios, orderAxios };