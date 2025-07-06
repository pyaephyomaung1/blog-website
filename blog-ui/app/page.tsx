'use client';

import { useBlogData } from '@/hook/useBlogData';
import LoadingScreen from '@/components/LoadingScreen';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// Import the new components
import Header from '@/components/Header';
import CategoriesNav from '@/components/CategoriesNav';
import ArticleCard from '@/components/ArticleCard'; // Assuming you created this
import Pagination from '@/components/Pagination';   // Assuming you created this
import Footer from '@/components/Footer';         // Assuming you created this

export default function HomePage() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);

  // Note: useCategories hook is now only used in CategoriesNav, so it's removed here
  const { data, loading: articlesLoading, error: articlesError } = useBlogData(currentPage, 8);

  // Sync page state with URL
  useEffect(() => {
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    } else {
      setCurrentPage(1);
    }
  }, [pageParam]);

  if (articlesLoading) {
    return <LoadingScreen />;
  }

  if (articlesError) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-white opacity-75">{articlesError}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <CategoriesNav />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {data && data.articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={data.pagination.totalPages}
              hasPrevPage={data.pagination.hasPrevPage}
              hasNextPage={data.pagination.hasNextPage}
              totalItems={data.pagination.total}
            />
          </>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-white">No articles found</h2>
              <p className="text-white/60 mb-6">We couldn't find any articles matching your criteria.</p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                Return Home
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}