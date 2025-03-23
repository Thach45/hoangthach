'use client';

import { useEffect } from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import { DarkModeProvider } from '../context/DarkModeContext';
import PreLoader from './PreLoader';
import ScrollToTop from './ScrollToTop';
import AOS from 'aos';
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Initialize AOS
    if (typeof window !== 'undefined') {
      
      AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out',
      });
    }

    // Scroll Progress
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progress = document.querySelector('.scroll-progress') as HTMLElement;
      if (progress) {
        progress.style.setProperty('--scroll', `${scrolled}%`);
      }
    };

    // Cursor Glow Effect
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector('.cursor-glow::before') as HTMLElement;
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    // Particle Effect
    const createParticle = (x: number, y: number) => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.setProperty('--x', `${Math.random() * 200 - 100}px`);
      particle.style.setProperty('--y', `${Math.random() * 200 - 100}px`);
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      const particles = document.getElementById('particles');
      if (particles) {
        particles.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
      }
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 5; i++) {
        createParticle(e.clientX, e.clientY);
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <DarkModeProvider>
      <LanguageProvider>
        <div className="bg-gray-50 dark:bg-gray-900 cursor-glow min-h-screen">
          <PreLoader />
          <div className="scroll-progress"></div>
          {children}
          <div id="particles"></div>
          <ScrollToTop />
        </div>
      </LanguageProvider>
    </DarkModeProvider>
  );
}