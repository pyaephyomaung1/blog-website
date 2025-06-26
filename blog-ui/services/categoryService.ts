// services/categoryService.ts
import apiClient from './api';
import { Category } from '@/types/category';

// Get all categories
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get('/api/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get category by ID (includes articles)
export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await apiClient.get(`/api/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};