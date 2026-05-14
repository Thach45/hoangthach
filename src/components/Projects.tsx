'use client';

import { useLanguage } from '../context/LanguageContext';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ProjectFilter from './ProjectFilter';
import ProjectModal from './ProjectModal';
import ProjectSkeleton from './ProjectSkeleton';
import { projects } from '@/data/data';
import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';

export default function Projects() {
  const { isEnglish } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedFramework, setSelectedFramework] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const projectsPerPage = 6;

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, selectedStatus, selectedLanguage, selectedFramework, searchQuery]);

  const filteredProjects = projects
    .filter((project) => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || 
        (selectedStatus === 'developing' && !project.endDate) ||
        (selectedStatus === 'completed' && project.endDate);
      const matchesLanguage = selectedLanguage === 'all' || 
        project.languages.includes(selectedLanguage);
      const matchesFramework = selectedFramework === 'all' || 
        project.frameworks.includes(selectedFramework);
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.languages.some(lang => lang.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.frameworks.some(framework => framework.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesStatus && matchesLanguage && matchesFramework && matchesSearch;
    })
    .slice(0, page * projectsPerPage);

  const hasMore = filteredProjects.length < projects
    .filter(p => 
      (selectedCategory === 'all' || p.category === selectedCategory) &&
      (selectedStatus === 'all' || 
        (selectedStatus === 'developing' && !p.endDate) ||
        (selectedStatus === 'completed' && p.endDate)) &&
      (selectedLanguage === 'all' || p.languages.includes(selectedLanguage)) &&
      (selectedFramework === 'all' || p.frameworks.includes(selectedFramework)) &&
      (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.languages.some(lang => lang.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.frameworks.some(framework => framework.toLowerCase().includes(searchQuery.toLowerCase())))
    ).length;

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
          {isEnglish ? 'Top Projects' : 'Dự án nổi bật'}
        </h2>

        <ProjectFilter
          onFilterChange={setSelectedCategory}
          onSearchChange={setSearchQuery}
          onStatusChange={setSelectedStatus}
          onLanguageChange={setSelectedLanguage}
          onFrameworkChange={setSelectedFramework}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          selectedLanguage={selectedLanguage}
          selectedFramework={selectedFramework}
        />

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              // Show skeletons while loading
              [...Array(3)].map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <ProjectSkeleton />
                </motion.div>
              ))
            ) : filteredProjects.length > 0 ? (
              // Show actual projects limit 3
              filteredProjects.slice(0, 3).map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isEnglish={isEnglish}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))
            ) : (
              // Show no results message
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400"
              >
                {isEnglish ? 'No projects found' : 'Không tìm thấy dự án nào'}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {!isLoading && hasMore && filteredProjects.length > 0 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setPage(p => p + 1)}
              className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-bold text-gray-800 dark:text-white"
            >
              {isEnglish ? 'Load More' : 'Tải thêm'}
            </button>
            <Link
              href="/projects"
              className="w-full sm:w-auto px-8 py-3 bg-brand-gradient text-white rounded-full hover:brightness-110 transition-all font-bold text-center"
            >
              {isEnglish ? 'View All Projects' : 'Xem tất cả dự án'}
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  isEnglish: boolean;
  index: number;
  onClick: () => void;
}

function ProjectCard({ project, isEnglish, index, onClick }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group border border-gray-100 dark:border-gray-800"
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transform group-hover:scale-105 transition duration-700"
        />
        
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md shadow-lg ${project.endDate ? 'bg-green-500' : 'bg-yellow-500'}`}>
            <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
            <span className="text-[9px] font-bold text-white uppercase ">
              {isEnglish ? project.status.en : project.status.vi}
            </span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-white text-2xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.title}</h3>
            <div className="flex flex-wrap gap-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
              {project.tech.slice(0, 3).map((t, i) => (
                <span key={i} className="text-xs text-brandCyan font-medium">#{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand transition-colors duration-300">
            {project.title}
          </h3>
        </div>
       
        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 text-sm leading-relaxed">
          {isEnglish ? project.description.en : project.description.vi}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
          <div className="flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-400 hover:text-brand transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {project.demoVideo && (
              <span className="text-gray-400 hover:text-brand transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            )}
          </div>

          <div className="flex items-center text-brand font-bold text-sm">
            {isEnglish ? 'DETAILS' : 'CHI TIẾT'}
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
