'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAnimations } from '../hooks/useAnimations';
import TrueFocus from '@/animation/TrueFocus/TrueFocus';

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
      
      <div className="container mx-auto px-6 text-center pb-17">
        <h1 
          className="text-6xl md:text-8xl font-bold mb-8 gradient-text "
          data-depth="0.1"
        >
          {isEnglish ? 'Backend Developer' : 'Lập trình viên Backend'}
        </h1>
        <p 
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 typewriter parallax-element"
          data-depth="0.05"
        >
          {isEnglish ? (
            <>Hello, I am <span className="gradient-text text-[28px]">Hoang Thach</span></>
          ) : (
            <>Xin chào, tôi là <span className="gradient-text text-[28px]">Hoàng Thạch</span></>
          )}
        </p>
        <div className="parallax-element flex items-center justify-center gap-4 flex-wrap" data-depth="0.02">
          <Link href="#projects" className="bg-brand text-white px-8 py-4 rounded-full text-lg font-medium hover:brightness-110 transition-all transform hover:scale-105 inline-block" aria-label={isEnglish ? 'View my projects' : 'Xem dự án của tôi'}>
            {isEnglish ? 'View my projects' : 'Xem dự án của tôi'}
          </Link>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-brand text-brand px-6 py-3 rounded-full text-base font-medium hover:bg-brand/10 transition-all transform hover:scale-105 inline-flex items-center gap-2"
            aria-label={isEnglish ? 'View backend CV' : 'Xem CV backend'}
          >
            <span>{isEnglish ? 'View CV' : 'Xem CV'}</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-brand/15 text-brand">Backend</span>
          </a>
          <a
            href="/cv_fullstack.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-brandCyan text-brandCyan px-6 py-3 rounded-full text-base font-medium hover:bg-brandCyan/10 transition-all transform hover:scale-105 inline-flex items-center gap-2"
            aria-label={isEnglish ? 'View fullstack CV' : 'Xem CV fullstack'}
          >
            <span>{isEnglish ? 'View CV' : 'Xem CV'}</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-brandCyan/15 text-brandCyan">Fullstack</span>
          </a>
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