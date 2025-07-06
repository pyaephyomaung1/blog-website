'use client';

import Link from 'next/link';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalItems: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasPrevPage,
  hasNextPage,
  totalItems,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null; // Don't render pagination if only one page or less
  }

  return (
    <div className="mt-12 flex justify-center items-center space-x-4">
      {/* Previous Button */}
      <Link
        href={`/?page=${currentPage - 1}`}
        className={`flex items-center justify-center w-10 h-10 rounded-full border ${
          !hasPrevPage
            ? 'border-white/10 text-white/30 cursor-not-allowed'
            : 'border-white/30 text-white hover:bg-white/10 transition-colors duration-200'
        }`}
        aria-disabled={!hasPrevPage}
        tabIndex={!hasPrevPage ? -1 : undefined}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Link>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`/?page=${page}`}
          className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
            page === currentPage
              ? 'bg-white text-black'
              : 'border border-white/10 text-white hover:bg-white/10 transition-colors duration-200'
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Next Button */}
      <Link
        href={`/?page=${currentPage + 1}`}
        className={`flex items-center justify-center w-10 h-10 rounded-full border ${
          !hasNextPage
            ? 'border-white/10 text-white/30 cursor-not-allowed'
            : 'border-white/30 text-white hover:bg-white/10 transition-colors duration-200'
        }`}
        aria-disabled={!hasNextPage}
        tabIndex={!hasNextPage ? -1 : undefined}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
}