// services/articleService.ts
import apiClient from './api';
import { Article, PaginatedArticles } from '@/types/article';

// Get all articles with pagination
export const getAllArticles = async (page: number = 1, limit: number = 8): Promise<PaginatedArticles> => {
  try {
    const response = await apiClient.get(`/api/v1/articles?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

// Get article by ID
export const getArticleById = async (id: string): Promise<Article> => {
  try {
    const response = await apiClient.get(`/api/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

// Get articles by category
export const getArticlesByCategory = async (categoryId: string): Promise<Article[]> => {
  try {
    const response = await apiClient.get(`/api/v1/articles/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    throw error;
  }
};