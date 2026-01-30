'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const { isEnglish, toggleLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { href: '#home', vi: 'Trang chủ', en: 'Home' },
    { href: '#about', vi: 'Giới thiệu', en: 'About' },
    { href: '#skills', vi: 'Kỹ năng', en: 'Skills' },
    { href: '#imprints', vi: 'Dấu ấn', en: 'Imprints' },
    { href: '#projects', vi: 'Dự án', en: 'Projects' },
    { href: '#contact', vi: 'Liên hệ', en: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="#" className="text-2xl font-bold gradient-text">
            Hoang Thach
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href} className="text-gray-800 dark:text-white hover:text-brand transition-colors">
                {isEnglish ? item.en : item.vi}
              </Link>
            ))}

            <button 
              onClick={toggleDarkMode}
              className="text-gray-800 dark:text-white hover:text-brand transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-800 dark:text-white">VN</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isEnglish}
                  onChange={toggleLanguage}
                  aria-label="Toggle language"
                />
                <div className="w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-7 peer-checked:bg-brand after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-sm" />
              </label>
              <span className="text-sm font-medium text-gray-800 dark:text-white">EN</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 dark:text-white hover:text-brand transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur"
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block text-gray-800 dark:text-white hover:text-brand transition-colors py-2"
                  onClick={closeMenu}
                >
                  {isEnglish ? item.en : item.vi}
                </Link>
              ))}

              <div className="flex items-center justify-between py-2">
                <button 
                  onClick={toggleDarkMode}
                  className="text-gray-800 dark:text-white hover:text-brand transition-colors"
                  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {isEnglish ? 'Language:' : 'Ngôn ngữ:'}
                  </span>
                  <button
                    onClick={toggleLanguage}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {isEnglish ? 'EN' : 'VN'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}