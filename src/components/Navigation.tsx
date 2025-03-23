'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';

export default function Navigation() {
  const { isEnglish, toggleLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navItems = [
    { href: '#home', vi: 'Trang chủ', en: 'Home' },
    { href: '#about', vi: 'Giới thiệu', en: 'About' },
    { href: '#skills', vi: 'Kỹ năng', en: 'Skills' },
    { href: '#projects', vi: 'Dự án', en: 'Projects' },
    { href: '#contact', vi: 'Liên hệ', en: 'Contact' },
  ];

  return (
    <nav className="fixed w-full z-50 nav-blur">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="#" legacyBehavior>
            <a className="text-2xl font-bold gradient-text">Portfolio</a>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href} legacyBehavior>
                <a className="text-gray-800 dark:text-white hover:text-teal-600 transition-colors">
                  {isEnglish ? item.en : item.vi}
                </a>
              </Link>
            ))}

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="text-gray-800 dark:text-white hover:text-teal-600 transition-colors flex items-center"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Language Toggle */}
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-800 dark:text-white">VN</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isEnglish}
                  onChange={toggleLanguage}
                />
                <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-7 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-sm">
                </div>
              </label>
              <span className="text-sm font-medium text-gray-800 dark:text-white">EN</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}