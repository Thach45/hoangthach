'use client';

import Link from 'next/link';

interface HeaderProps {
  isEnglish: boolean;
  isDarkMode: boolean;
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
}

export default function Header({ isEnglish, isDarkMode, toggleLanguage, toggleDarkMode }: HeaderProps) {
  return (
    <header className="relative z-50 w-full backdrop-blur-xl bg-white/50 dark:bg-black/20 border-b border-gray-200 dark:border-white/5 py-3 px-4 md:px-8 flex justify-between items-center shrink-0 transition-colors duration-300">
      <Link 
        href="/" 
        className="flex items-center gap-2 text-gray-600 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors group bg-white/50 dark:bg-white/5 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none"
      >
        <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-white/20 transition-colors">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </div>
        <span className="text-sm font-medium">{isEnglish ? 'View Full Portfolio' : 'Trang chủ'}</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2.5 bg-brand/10 px-3 py-1.5 rounded-full border border-brand/20 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
          </span>
          <span className="text-xs font-medium text-brand">{isEnglish ? 'AI Active' : 'Trợ lý AI'}</span>
        </div>

        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="text-gray-600 dark:text-white/80 hover:text-brand transition-colors p-2 bg-white/50 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Language Toggle */}
        <div className="flex items-center gap-1 bg-white/50 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
          <span className="text-xs font-medium text-gray-600 dark:text-white/80">VN</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isEnglish}
              onChange={toggleLanguage}
              aria-label="Toggle language"
            />
            <div className="w-8 h-4 bg-gray-300 dark:bg-white/20 rounded-full peer peer-checked:after:translate-x-4 peer-checked:bg-brand after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all shadow-inner" />
          </label>
          <span className="text-xs font-medium text-gray-600 dark:text-white/80">EN</span>
        </div>
      </div>
    </header>
  );
}
