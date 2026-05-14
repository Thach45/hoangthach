'use client';

import { projects } from '@/data/data';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useMemo, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import ProjectModal from '@/components/ProjectModal';
import dynamic from 'next/dynamic';
import { Project } from '@/types/project';
import { FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';

const StarsCanvas = dynamic(() => import('@/components/canvas/Stars'), { ssr: false });

export default function ProjectsPage() {
  const { isEnglish } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('all');
  
  const planetsRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);
  const mountainsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (planetsRef.current) planetsRef.current.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
      if (starsRef.current) starsRef.current.style.transform = `translate3d(0, ${y * 0.2}px, 0)`;
      if (mountainsRef.current) mountainsRef.current.style.transform = `translate3d(0, ${y * 0.05}px, 0)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = useMemo(() => {
    const cats = projects.map(p => p.category);
    return ['all', ...Array.from(new Set(cats))];
  }, []);

  const filteredProjects = projects.filter(p => {
    return filter === 'all' || p.category === filter;
  });

  return (
    <Layout>
      <Navigation />
      <main className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-[#050505]">
        {/* Parallax Background (Space Theme) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div ref={planetsRef} className="absolute inset-0 opacity-40">
            <Image src="/asset/planets.png" alt="" fill className="object-cover" />
          </div>
          <div ref={starsRef} className="absolute inset-0 opacity-60">
            <Image src="/asset/stars.png" alt="" fill className="object-cover" />
          </div>
          <div ref={mountainsRef} className="absolute inset-0 opacity-30">
            <Image src="/asset/mountains.png" alt="" fill className="object-cover" />
          </div>
          <StarsCanvas />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header Section (Kept from Redesign) */}
          <header className="mb-20 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <span className="text-xs font-bold text-brandCyan uppercase">
                {isEnglish ? 'Showcase' : 'Trưng bày'}
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-8 gradient-text"
            >
              {isEnglish ? 'Projects & Products' : 'Dự án & Sản phẩm'}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
            >
              {isEnglish 
                ? 'Architecting the future of backend systems and AI experiences. Each project is a milestone in my journey of engineering excellence.' 
                : 'Kiến tạo tương lai cho các hệ thống backend và trải nghiệm AI. Mỗi dự án là một dấu mốc trên hành trình theo đuổi sự xuất sắc.'}
            </motion.p>
          </header>

          {/* Filter Bar (Search removed) */}
          <div className="flex justify-center mb-16 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] px-6 py-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase transition-all duration-300 border ${
                    filter === cat 
                      ? 'bg-brand border-brand text-white shadow-lg shadow-brand/40 scale-105' 
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-brand/50 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid with Restored Original Card Layout */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  idx={idx} 
                  isEnglish={isEnglish}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-32">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                <FaSearch className="text-gray-600 text-2xl" />
              </div>
              <p className="text-gray-500 text-xl italic">
                {isEnglish ? 'No matches found in the cosmic void.' : 'Không tìm thấy kết quả nào trong không gian.'}
              </p>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
      <Footer />
    </Layout>
  );
}

function ProjectCard({ project, idx, isEnglish, onClick }: { project: Project, idx: number, isEnglish: boolean, onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="group relative h-full flex flex-col bg-white/5 backdrop-blur-md rounded-[2rem] overflow-hidden border border-white/10 cursor-pointer shadow-2xl transition-all duration-500"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Image Container (Original 4/3 Layout) */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image 
          src={project.image} 
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Overlay Content on Hover */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <div className="flex gap-2 mb-4">
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {project.github && <FaGithub className="text-white text-xl hover:text-brand transition-colors" />}
            <FaExternalLinkAlt className="text-white text-lg hover:text-brand transition-colors" />
          </div>
        </div>
      </div>

      {/* Text Content Below Image (Original Layout) */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold uppercase text-brand">
            {project.category}
          </span>
          <div className={`w-2.5 h-2.5 rounded-full ${project.endDate ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]'} animate-pulse`} />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brandCyan transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed flex-1">
          {isEnglish ? project.description.en : project.description.vi}
        </p>
        
        {/* Detail Indicator */}
        <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-white/40 group-hover:text-white transition-colors">
          <span>{isEnglish ? 'VIEW DETAILS' : 'XEM CHI TIẾT'}</span>
          <div className="h-px w-0 group-hover:w-8 bg-brand transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  );
}
