'use client';

import { useEffect, useState } from 'react';

export default function PreLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 1000);
    };
  
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
  
    return () => window.removeEventListener("load", handleLoad);
  }, []);
  

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="relative">
        <div className="loader"></div>
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className="text-lg font-medium text-gray-600 dark:text-gray-300 gradient-text">
            Loading...
          </span>
        </div>
      </div>

      <style jsx>{`
        .loader {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid var(--color-primary, #00B4DB);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}