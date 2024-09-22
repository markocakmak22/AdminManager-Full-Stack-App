import axiosInstance from '../api/axiosInstance';
import { Product, FormProduct } from '../types/types';

export const productService = {
  getAllProducts: async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
  },

  createProduct: async (product: Omit<FormProduct, 'id'>): Promise<Product> => {
    const response = await axiosInstance.post('/products', product);
    return response.data;
  },

  updateProduct: async (id: string, category: Omit<FormProduct, 'id'>): Promise<Product> => {
    const response = await axiosInstance.put(`/products/${id}`, category);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/products/${id}`);
  },
};
