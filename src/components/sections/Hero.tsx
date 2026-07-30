'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAnimations } from '@/hooks/useAnimations';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const TicofabCanvas = dynamic(() => import('@/components/visuals/canvas/Tico'), { ssr: false });
const StarsCanvas = dynamic(() => import('@/components/visuals/canvas/Stars'), { ssr: false });

import { personalInfo, heroText } from '@/data/data';

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
          <div className="relative w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[110px] md:text-[200px] font-black pointer-events-none select-none dark:text-white text-gray-900 uppercase whitespace-nowrap tracking-tighter flex justify-center">
              {"THACH HOANG".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0.02, y: 0 }}
                  animate={{ 
                    opacity: [0.02, 0.25, 0.02], 
                    y: [0, -15, 0],
                    textShadow: [
                      "0px 0px 0px rgba(6, 182, 212, 0)",
                      "0px 0px 50px rgba(6, 182, 212, 0.8)",
                      "0px 0px 0px rgba(6, 182, 212, 0)"
                    ]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                  className={`${char === " " ? "w-[30px] md:w-[50px]" : ""} inline-block`}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Layer 2: 3D Astro Model (z-20) - Hidden on mobile */}
      <div className="absolute inset-0 z-40 pointer-events-none hidden md:block">
        <TicofabCanvas />
      </div>

      {/* Layer 3: Foreground Intro & Actions (z-30) */}
      <div className="absolute inset-0 flex items-center justify-center z-50 mt-80">
        <div className="container mx-auto px-6 text-center">
          <div className="space-y-10">
            <p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 typewriter max-w-2xl mx-auto drop-shadow-sm"
              data-depth="0.05"
            >
              {isEnglish ? (
                <>{heroText.greetings.en} <span className="gradient-text font-bold text-3xl">{personalInfo.name.en}</span></>
              ) : (
                <>{heroText.greetings.vi} <span className="gradient-text font-bold text-3xl">{personalInfo.name.vi}</span></>
              )}
            </p>
            
            <div className="flex flex-wrap z-50 items-center justify-center gap-6" data-depth="0.02">
              
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={personalInfo.cv.backend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-2 z-50 border-brand text-brand px-6 py-3 rounded-xl text-base font-bold hover:bg-brand hover:text-white transition-all transform hover:scale-105 inline-flex items-center gap-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                >
                  <span>CV Backend</span>
                  <svg className="w-4 h-4  group-hover:translate-y-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V3"/></svg>
                </a>
                <a
                  href={personalInfo.cv.fullstack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-2 z-50 border-brandCyan text-brandCyan px-6 py-3 rounded-xl text-base font-bold hover:bg-brandCyan hover:text-white transition-all transform hover:scale-105 inline-flex items-center gap-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
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
