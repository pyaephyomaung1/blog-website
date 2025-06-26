// hooks/useBlogData.ts
import { useState, useEffect } from 'react';
import { getAllArticles } from '@/services/articleService';
import { PaginatedArticles } from '@/types/article';

export const useBlogData = (page: number = 1, limit: number = 8) => {
  const [data, setData] = useState<PaginatedArticles | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);
        const articles = await getAllArticles(page, limit);
        setData(articles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [page, limit]);

  return { data, loading, error };
};