import { Category } from "./category";

export interface Article {
  id: string;
  title: string;
  meta_description: string;
  body: string;
  image?: string;
  categoryId: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedArticles {
  pagination: any;
  articles: Article[];
  total: number;
  totalPages: number;
  currentPage: number;
}
