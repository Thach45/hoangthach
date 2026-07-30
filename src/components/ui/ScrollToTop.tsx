'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-brand text-white p-3 rounded-full shadow-lg hover:brightness-110 transition-all transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}

      <style jsx>{`
        button {
          opacity: ${isVisible ? 1 : 0};
          visibility: ${isVisible ? 'visible' : 'hidden'};
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}