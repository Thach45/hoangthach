'use client';

import { useLanguage } from '../context/LanguageContext';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ProjectFilter from './ProjectFilter';
import ProjectModal from './ProjectModal';
import ProjectSkeleton from './ProjectSkeleton';
import ProjectProgress from './ProjectProgress';
import { projects } from '@/data/projects';
import { Project } from '@/types/project';
import Image from 'next/image';

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
              [...Array(6)].map((_, i) => (
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
              // Show actual projects
              filteredProjects.map((project, index) => (
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
          <div className="mt-12 text-center">
            <button
              onClick={() => setPage(p => p + 1)}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full hover:from-teal-600 hover:to-blue-600 transition-colors"
            >
              {isEnglish ? 'Load More Projects' : 'Xem thêm dự án'}
            </button>
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
      className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden card-hover cursor-pointer group"
      onClick={onClick}
      whileHover={{ y: -10 }}
    >
      <div className="relative overflow-hidden aspect-video">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transform group-hover:scale-110 transition duration-500"
        />
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full text-sm font-medium shadow-lg">
            {isEnglish ? project.status.en : project.status.vi}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity">
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white text-xl font-bold">{project.title}</h3>
            <p className="text-gray-300">{project.techStack}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {isEnglish ? project.description.en : project.description.vi}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech: string, techIndex: number) => (
            <motion.span
              key={techIndex}
              className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-teal-500/10 to-blue-500/10 text-teal-600 dark:text-teal-400"
              whileHover={{ scale: 1.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Project Progress */}
        <ProjectProgress project={project} className="mb-4" />

        {/* Project Metrics */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-center p-2 rounded-lg bg-gradient-to-br from-teal-500/10 to-blue-500/10">
            <div className="text-sm font-semibold text-teal-600 dark:text-teal-400">
              {project.metrics.commits}
            </div>
            <div className="text-xs text-gray-500">Commits</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-gradient-to-br from-teal-500/10 to-blue-500/10">
            <div className="text-sm font-semibold text-teal-600 dark:text-teal-400">
              {project.metrics.pullRequests}
            </div>
            <div className="text-xs text-gray-500">PRs</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <motion.span whileHover={{ scale: 1.1 }}>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.span>
              </a>
            )}
            {project.demoVideo && (
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-teal-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.span>
            )}
          </div>

          <div className="text-teal-600 hover:text-teal-700 font-medium">
            {isEnglish ? 'View Details →' : 'Xem chi tiết →'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
