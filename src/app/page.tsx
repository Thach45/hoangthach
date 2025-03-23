'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxStyles = {
    planets: {
      transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
      transition: 'transform 0.1s linear',
    },
    stars: {
      transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
      transition: 'transform 0.1s linear',
    },
    mountains: {
      transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
      transition: 'transform 0.1s linear',
    },
  };

  return (
    <Layout>
      <Navigation />
      <div className="parallax-container">
        <div className="absolute inset-0" style={parallaxStyles.planets}>
          <Image
            src="/asset/planets.png"
            alt="planets"
            fill
            sizes="100vw"
            className="plants object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0" style={parallaxStyles.stars}>
          <Image
            src="/asset/stars.png"
            alt="stars"
            fill
            sizes="100vw"
            className="stars object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0" style={parallaxStyles.mountains}>
          <Image
            src="/asset/mountains.png"
            alt="mountains"
            fill
            sizes="100vw"
            className="mountains object-cover"
            priority
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
