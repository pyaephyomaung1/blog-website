'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="p-4 md:p-6 border-b border-white/10 sticky top-0 z-40 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo and Site Title */}
          <div className="flex items-center space-x-4">
            <img
              src="./assets/icons/logo.png"
              alt="Blog Logo"
              className="h-8 w-8 md:h-10 md:w-10 object-contain hover:scale-105 transition-transform duration-300"
            />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Sithu Opinio
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors duration-200 font-medium relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-white/80 hover:text-white transition-colors duration-200 font-medium relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className="text-white/80 hover:text-white transition-colors duration-200 font-medium relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Mobile Menu Button (Hamburger Icon) */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md p-2 transition-all duration-200 hover:bg-white/10"
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-0 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute top-5 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMobileMenu}
      >
        {/* Mobile Menu Panel */}
        <div
          className={`fixed top-0 right-0 w-full sm:w-1/2 h-full bg-gradient-to-b from-gray-900 to-black border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <img
                src="./assets/icons/logo.png"
                alt="Blog Logo"
                className="h-8 w-8 object-contain"
              />
              <h2 className="text-lg font-bold text-white">Menu</h2>
            </div>
            <button
              onClick={closeMobileMenu}
              className="text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md p-2 hover:bg-white/10 transition-all duration-200"
              aria-label="Close mobile menu"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex flex-col justify-center items-center h-full px-6 pb-20">
            <nav className="flex flex-col space-y-8 text-center">
              <Link
                href="/"
                className="text-white text-2xl font-medium hover:text-gray-300 transition-all duration-300 relative group"
                onClick={closeMobileMenu}
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
              </Link>
              <Link
                href="/about"
                className="text-white text-2xl font-medium hover:text-gray-300 transition-all duration-300 relative group"
                onClick={closeMobileMenu}
              >
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
              </Link>
              <Link
                href="/contact"
                className="text-white text-2xl font-medium hover:text-gray-300 transition-all duration-300 relative group"
                onClick={closeMobileMenu}
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
              </Link>
            </nav>

            {/* Decorative Elements */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}