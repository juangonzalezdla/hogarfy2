import { authAxios, categoryAxios, productAxios } from './axios';

// Auth
export const loginRequest = async (user) => authAxios.post(`/login`, user);
export const verifyTokenRequest = async () => authAxios.get(`/verify`);

// Categories
export const createCategoryRequest = async (category) => categoryAxios.post('/create-category', category);
export const getCategoriesRequest = async () => categoryAxios.get('/get-categories');
export const getCategoryRequest = async (id) => categoryAxios.get(`/get-category/${id}`);
export const updateCategoryRequest = async (category) => categoryAxios.put(`/update-category/${category._id}`, category);
export const deleteCategoryRequest = async (id) => categoryAxios.delete(`/delete-category/${id}`);

// Products
export const createProductRequest = async (product) => productAxios.post('/create-product', product);
export const getProductsRequest = async () => productAxios.get('/get-products');
export const getProductRequest = async (id) => productAxios.get(`/get-product/${id}`);
export const updateProductRequest = async (product) => productAxios.put(`/update-product/${product._id}`, product);
export const deleteProductRequest = async (id) => productAxios.delete(`/delete-product/${id}`);