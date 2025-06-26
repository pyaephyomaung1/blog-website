// app/page.tsx
'use client';

import { useBlogData } from '@/hook/useBlogData';
import { useCategories } from '@/hook/useCategories';
import LoadingScreen from '@/components/LoadingScreen';
import Link from 'next/link';

export default function HomePage() {
  const { data, loading: articlesLoading, error: articlesError } = useBlogData(1, 8);
  const { categories, loading: categoriesLoading } = useCategories();
  console.log(data)

  if (articlesLoading) {
    return <LoadingScreen />;
  }

  if (articlesError) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-400">{articlesError}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-6 border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <img src="./assets/icons/logo.png" alt="Blog Logo" className="h-12" />
          <h1 className="text-3xl font-bold">Sports Blog</h1>
        </div>
      </header>

      {/* Categories Navigation */}
      {!categoriesLoading && categories.length > 0 && (
        <nav className="bg-gray-900 p-4">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors">
                All Articles
              </Link>
              {categories.map((category) => (
                <Link 
                  key={category.id} 
                  href={`/category/${category.id}`}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {data && data.articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.articles.map((article) => (
                <div key={article.id} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                  {/* Article Image */}
                  {article.image && (
                    <div className="h-48 bg-gray-800">
                      <img
                        src={`http://localhost:5001${article.image}`}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Category Badge */}
                    {article.category && (
                      <span className="inline-block px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded mb-3">
                        {article.category.name}
                      </span>
                    )}
                    
                    {/* Title */}
                    <h2 className="text-xl font-semibold mb-3 line-clamp-2">{article.title}</h2>
                    
                    {/* Meta Description */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{article.meta_description}</p>
                    
                    {/* Read More Button */}
                    <Link 
                      href={`/article/${article.id}`}
                      className="inline-block px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Info */}
            <div className="mt-8 text-center text-gray-400">
              <p>
                Showing {data.articles.length} of {data.total} articles 
                (Page {data.currentPage} of {data.totalPages})
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">No articles found.</p>
          </div>
        )}
      </div>
    </main>
  );
}