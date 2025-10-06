'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const tickingRef = useRef(false);
  const planetsRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);
  const mountainsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReduced = () => setReducedMotion(mq.matches);
    updateReduced();
    mq.addEventListener?.('change', updateReduced);

    const updateParallax = () => {
      tickingRef.current = false;
      if (reducedMotion) return;
      const y = window.scrollY;
      if (planetsRef.current) planetsRef.current.style.transform = `translate3d(0, ${y * 0.5}px, 0)`;
      if (starsRef.current) starsRef.current.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
      if (mountainsRef.current) mountainsRef.current.style.transform = `translate3d(0, ${y * 0.1}px, 0)`;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial apply
    requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('scroll', onScroll as EventListener);
      mq.removeEventListener?.('change', updateReduced);
    };
  }, [reducedMotion]);

  return (
    <Layout>
      <Navigation />
      <div className="parallax-container">
        <div className="absolute inset-0" ref={planetsRef} style={reducedMotion ? { transform: 'none' } : undefined}>
          <Image
            src="/asset/planets.png"
            alt="planets"
            fill
            sizes="100vw"
            className="plants object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0" ref={starsRef} style={reducedMotion ? { transform: 'none' } : undefined}>
          <Image
            src="/asset/stars.png"
            alt="stars"
            fill
            sizes="100vw"
            className="stars object-cover"
          />
        </div>
        <div className="absolute inset-0" ref={mountainsRef} style={reducedMotion ? { transform: 'none' } : undefined}>
          <Image
            src="/asset/mountains.png"
            alt="mountains"
            fill
            sizes="100vw"
            className="mountains object-cover"
          />
        </div>
        <Hero />
      </div>
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </Layout>
  );
}
