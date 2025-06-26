// hooks/useArticleById.ts
import { useState, useEffect } from 'react';
import { getArticleById } from '@/services/articleService';
import { Article } from '@/types/article';

export const useArticleById = (id: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const articleData = await getArticleById(id);
        setArticle(articleData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return { article, loading, error };
};