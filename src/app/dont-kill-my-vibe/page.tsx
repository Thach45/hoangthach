'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import PersonalImprints from '@/components/sections/PersonalImprints';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import FixedContactBar from '@/components/layout/FixedContactBar';

import { AnimatePresence } from 'framer-motion';
import ScrollSection from '@/components/ui/ScrollSection';

export default function Home() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const tickingRef = useRef(false);
  const planetsRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);
  const mountainsRef = useRef<HTMLDivElement | null>(null);
  const rocketRef = useRef<HTMLDivElement | null>(null);

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
      if (rocketRef.current) {
        const x = y * 1;     
        const yMove = y * 1; 
        const z = y * 0.4;
        const size =y * 0.02 + 0
      
        rocketRef.current.style.transform = `translate3d(${x}px, ${yMove}px, ${z}px) scale(${size}) rotate(135deg)`;
      }
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
      <AnimatePresence>
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
          <div className="absolute w-[80px] sm:w-[100px] z-20 h-[80px] sm:h-[100px] left-0 top-[20%] hidden md:block" ref={rocketRef} style={reducedMotion ? { transform: 'none' } : undefined}>
            <Image
              src="/asset/rocket.png"
              alt="rocket"
              fill
              sizes="100vw"
              className="rocket object-cover"
            />
          </div>
          <Hero />
        </div>

        <ScrollSection>
          <About />
        </ScrollSection>

        <ScrollSection>
          <Skills />
        </ScrollSection>


        <ScrollSection>
          <Projects />
        </ScrollSection>

        <ScrollSection>
          <Contact />
        </ScrollSection>

        <Footer />
        <FixedContactBar />
      </AnimatePresence>
    </Layout>
  );
}
