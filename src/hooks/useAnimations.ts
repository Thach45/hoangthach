import { useEffect, RefObject } from 'react';

interface UseAnimationsProps {
  heroRef?: RefObject<HTMLElement | null>;
  enableParallax?: boolean;
  enableTypewriter?: boolean;
}

export function useAnimations({ heroRef, enableParallax, enableTypewriter }: UseAnimationsProps = {}) {
  useEffect(() => {
    // Initialize AOS
    const AOS = require('aos');
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });

    // Parallax effect
    const handleParallax = () => {
      if (!heroRef?.current || !enableParallax) return;
      
      const scrolled = window.scrollY;
      const parallaxElements = heroRef.current.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach((element) => {
        const depth = (element as HTMLElement).dataset.depth || '0';
        const movement = scrolled * parseFloat(depth);
        (element as HTMLElement).style.transform = `translateY(${movement}px)`;
      });
    };

    // Typewriter effect
    const initTypewriter = () => {
      if (!heroRef?.current || !enableTypewriter) return;
      
      const text = heroRef.current.querySelector('.typewriter');
      if (text) {
        text.classList.add('typewriter-active');
      }
    };

    // Particle effect
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
    if (enableParallax) {
      window.addEventListener('scroll', handleParallax);
    }
    document.addEventListener('click', handleClick);

    // Initialize effects
    initTypewriter();

    // Cleanup
    return () => {
      if (enableParallax) {
        window.removeEventListener('scroll', handleParallax);
      }
      document.removeEventListener('click', handleClick);
    };
  }, [heroRef, enableParallax, enableTypewriter]);
}