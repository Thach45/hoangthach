'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAnimations } from '../hooks/useAnimations';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const TicofabCanvas = dynamic(() => import('./canvas/Tico'), { ssr: false });
const StarsCanvas = dynamic(() => import('./canvas/Stars'), { ssr: false });

export default function Hero() {
  const { isEnglish } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

  useAnimations({
    heroRef,
    enableParallax: true,
    enableTypewriter: true,
  });

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex items-center z-10 justify-center parallax-section relative overflow-hidden"
    >
      <StarsCanvas />
      
      {/* Layer 1: Background Title (z-10) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 -mt-64">
        <div className="container mx-auto px-6 text-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] md:text-[200px] font-black pointer-events-none select-none dark:text-white text-gray-900"
            >
              BACKEND
            </motion.div>
            <h1 
              className="relative text-7xl md:text-8xl font-bold gradient-text leading-tight"
              data-depth="0.1"
            >
              {isEnglish ? 'Backend Developer' : 'Lập trình viên Backend'}
            </h1>
          </div>
        </div>
      </div>

      {/* Layer 2: 3D Astro Model (z-20) */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <TicofabCanvas />
      </div>

      {/* Layer 3: Foreground Intro & Actions (z-30) */}
      <div className="absolute inset-0 flex items-center justify-center z-30 mt-80">
        <div className="container mx-auto px-6 text-center">
          <div className="space-y-10">
            <p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 typewriter max-w-2xl mx-auto drop-shadow-sm"
              data-depth="0.05"
            >
              {isEnglish ? (
                <>Hello, I am <span className="gradient-text font-bold text-3xl">Hoang Thach</span></>
              ) : (
                <>Xin chào, tôi là <span className="gradient-text font-bold text-3xl">Hoàng Thạch</span></>
              )}
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6" data-depth="0.02">
              <Link href="#projects" className="bg-brand text-white px-10 py-4 rounded-full text-lg font-bold hover:brightness-110 transition-all transform hover:scale-105 shadow-xl shadow-brand/25">
                {isEnglish ? 'Explore Projects' : 'Khám phá dự án'}
              </Link>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-2 border-brand text-brand px-6 py-3 rounded-xl text-base font-bold hover:bg-brand hover:text-white transition-all transform hover:scale-105 inline-flex items-center gap-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                >
                  <span>CV Backend</span>
                  <svg className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V3"/></svg>
                </a>
                <a
                  href="/cv_fullstack.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-2 border-brandCyan text-brandCyan px-6 py-3 rounded-xl text-base font-bold hover:bg-brandCyan hover:text-white transition-all transform hover:scale-105 inline-flex items-center gap-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                >
                  <span>CV Fullstack</span>
                  <svg className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V3"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 floating parallax-element"
        data-depth="0.03"
      >
        <span className="sr-only">{isEnglish ? 'Scroll to projects' : 'Cuộn xuống để xem dự án'}</span>
        <svg 
          className="w-6 h-6 text-brand animate-bounce" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M5 10l7 7 7-7"
          />
        </svg>
      </div>
    </section>
  );
}