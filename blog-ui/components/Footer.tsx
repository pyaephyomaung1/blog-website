'use client';

import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-white/60 text-sm">
          © {new Date().getFullYear()} Sithu Opinio. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <Link href="/privacy" className="text-white/60 hover:text-white transition-colors duration-200 text-sm">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-white/60 hover:text-white transition-colors duration-200 text-sm">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}