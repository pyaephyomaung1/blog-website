// components/LoadingScreen.tsx
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      {/* Logo at the top */}
      <div className="mb-8">
        <img src="/assets/icons/logo.png" alt="Logo" className="w-32 h-auto" />
      </div>
      
      {/* Bouncing ball */}
      <div className="relative w-16 h-16 mb-8">
        <img
          src="/assets/icons/football.png"
          alt="Loading"
          className="w-full h-full animate-bounce"
        />
      </div>
      
      {/* Loading text */}
      <p className="text-white text-xl font-semibold">
        Loading...
      </p>
    </div>
  );
};

export default LoadingScreen;