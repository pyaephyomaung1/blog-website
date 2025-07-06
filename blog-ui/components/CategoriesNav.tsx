'use client';

import { useCategories } from '@/hook/useCategories'; // Assuming this hook fetches categories
import Link from 'next/link';
import React from 'react';

export default function CategoriesNav() {
  const { categories, loading: categoriesLoading } = useCategories();

  if (categoriesLoading || categories.length === 0) {
    return null; // Don't render if loading or no categories
  }

  return (
    <nav className="bg-black border-b border-white/10 py-3">
      <div className="container mx-auto px-4 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          <Link
            href="/"
            className="px-4 py-2 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition-all duration-200"
          >
            All Articles
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}