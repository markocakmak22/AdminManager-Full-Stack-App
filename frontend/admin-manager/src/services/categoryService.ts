import axiosInstance from '../api/axiosInstance';
import { Category } from '../types/types';

export const categoryService = {
  getAllCategories: async () => {
    const response = await axiosInstance.get('/categories');
    return response.data;
  },

  createCategory: async (category: Omit<Category, 'id'>): Promise<Category> => {
    const response = await axiosInstance.post('/categories', category);
    return response.data;
  },

  updateCategory: async (id: string, category: Omit<Category, 'id'>): Promise<Category> => {
    const response = await axiosInstance.put(`/categories/${id}`, category);
    return response.data;
  },

  deleteCategory: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/categories/${id}`);
  },
};
