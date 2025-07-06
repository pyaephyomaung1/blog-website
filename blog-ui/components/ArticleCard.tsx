'use client';

import Link from 'next/link';
import React from 'react';

interface Article {
  id: string; // or number
  title: string;
  body: string; // This seems to be the meta description
  image?: string;
  category?: {
    id: string; // or number
    name: string;
  };
  createdAt: string; // Date string
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article
      key={article.id}
      className="group relative bg-black rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/5"
    >
      {/* Article Image */}
      {article.image && (
        <div className="relative h-48 bg-black overflow-hidden">
          <img
            src={`http://localhost:5001${article.image}`}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        </div>
      )}

      <div className="p-5">
        {/* Category Badge */}
        {article.category && (
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80 mb-3">
            {article.category.name}
          </span>
        )}

        {/* Title */}
        <h2 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-200">
          <Link href={`/article/${article.id}`} className="hover:underline">
            {article.title}
          </Link>
        </h2>

        {/* Meta Description */}
        <p className="text-white/60 text-sm mb-5 line-clamp-3 group-hover:text-white/80 transition-colors duration-200">
          {article.body}
        </p>

        {/* Read More Button */}
        <div className="flex justify-between items-center">
          <Link
            href={`/article/${article.id}`}
            className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-white/10 to-white/20 hover:from-white/20 hover:to-white/30 transition-all duration-200"
          >
            <span className="relative">Read More</span>
            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
          <span className="text-xs text-white/40">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </article>
  );
}