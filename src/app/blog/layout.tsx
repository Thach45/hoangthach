'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '@/context/DarkModeContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isEnglish, setIsEnglish } = useLanguage() as any;

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-zinc-900 selection:text-white relative overflow-hidden transition-colors duration-500">
      
      {/* Animated Checkered Background (Shared) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.08]">
        <motion.div 
          initial={{ backgroundPosition: '0 0' }}
          animate={{ backgroundPosition: ['0 0', '40px 40px'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Navbar Minimal (Shared) */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAFAFA]/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 transition-colors duration-300">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg hover:text-brand transition-colors">Thach.Blog</Link>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setIsEnglish(!isEnglish)}
              className="text-xs font-bold px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
            >
              {isEnglish ? 'VI' : 'EN'}
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Very Clean Footer (Shared) */}
      <footer className="relative z-10 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-screen-xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-sm">© 2024 Thach. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
