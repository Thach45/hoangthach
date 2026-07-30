'use client';

import { useLanguage } from '../context/LanguageContext';
import { Project } from '../types/project';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaGithub, FaShare, FaPlay, FaPause, FaExternalLinkAlt } from 'react-icons/fa';
import { useEffect, useMemo, useState, useRef } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useToast } from './Toast';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { isEnglish } = useLanguage();
  const { showToast, ToastComponent } = useToast();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges'>('overview');
  const videoRef = useRef<HTMLVideoElement>(null);
  const galleryImages = useMemo(() => {
    const images = [project.image, ...(project.gallery ?? [])].filter(Boolean);
    return Array.from(new Set(images));
  }, [project]);
  const [activeImage, setActiveImage] = useState(galleryImages[0] || project.image);

  useEffect(() => {
    setActiveImage(galleryImages[0] || project.image);
    setIsVideoPlaying(false);
    setIsImageLoading(true);
  }, [galleryImages, project.image]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const shareProject = async () => {
    try {
      await navigator.share({
        title: project.title,
        text: isEnglish ? project.description.en : project.description.vi,
        url: project.link,
      });
      showToast(isEnglish ? 'Project shared successfully!' : 'Đã chia sẻ dự án thành công!');
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        showToast(
          isEnglish ? 'Failed to share project' : 'Không thể chia sẻ dự án',
          'error'
        );
      }
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        setIsVideoLoading(true);
        videoRef.current
          .play()
          .then(() => setIsVideoLoading(false))
          .catch(console.error);
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const TabButton = ({ tab, label }: { tab: typeof activeTab; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        activeTab === tab
          ? 'bg-brand text-white shadow-sm'
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="relative w-full max-w-6xl h-[88vh] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-black/80 z-20">
              <LoadingSpinner />
            </div>
          )}
          <Image
            src={activeImage}
            alt={project.title}
            fill
            className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
            onLoadingComplete={() => setIsImageLoading(false)}
          />
          {project.demoVideo && (
            <video
              ref={videoRef}
              
              src={project.demoVideo}
              muted
              className={`absolute inset-0 w-full h-full object-cover bg-black ${isVideoPlaying ? 'block' : 'hidden'}`}
              onLoadedData={() => setIsVideoLoading(false)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/75" />
        </div>

        {/* Global controls */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 rounded-full bg-black/45 text-white hover:bg-black/65 transition-colors"
        >
          <IoClose size={20} />
        </button>
        {project.demoVideo && (
          <button
            onClick={toggleVideo}
            className="absolute top-4 right-16 z-40 h-10 w-10 rounded-full bg-black/45 text-white flex items-center justify-center hover:bg-black/65 transition-colors"
            aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
          >
            {isVideoLoading ? (
              <LoadingSpinner className="text-white" />
            ) : isVideoPlaying ? (
              <FaPause className="w-4 h-4" />
            ) : (
              <FaPlay className="w-4 h-4 ml-0.5" />
            )}
          </button>
        )}

        {galleryImages.length > 1 && (
          <div className="absolute left-4 bottom-4 z-30 flex items-center gap-2 overflow-x-auto max-w-[50%]">
            {galleryImages.slice(0, 5).map((img, index) => (
              <button
                key={`${project.id}-modal-thumb-${index}`}
                onClick={() => {
                  setIsVideoPlaying(false);
                  setIsImageLoading(true);
                  setActiveImage(img);
                }}
                className={`relative h-14 w-20 rounded-md overflow-hidden border-2 transition-all ${
                  img === activeImage
                    ? 'border-brand shadow-md'
                    : 'border-white/30 hover:border-white/60'
                }`}
                aria-label={`Preview ${index + 1}`}
              >
                <Image
                  src={img}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Floating info card */}
        <div className="absolute inset-x-4 bottom-4 md:inset-x-auto md:right-4 z-30 md:w-[48%] h-[calc(88vh-2rem)] bg-white/95 dark:bg-black/50 backdrop-blur-md rounded-xl shadow-xl border border-white/20 dark:border-white/15 overflow-hidden">
          <div className="relative flex h-full flex-col min-h-0">
            {/* Header */}
            <div className="p-6 border-b border-white/20 dark:border-white/10">
              <h2 className="text-3xl font-bold text-brand">
                {project.title}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-white">
                {isEnglish ? project.description.en : project.description.vi}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-4 border-b dark:border-white/10">
              <TabButton 
                tab="overview" 
                label={isEnglish ? "Overview" : "Tổng quan"} 
              />
              <TabButton 
                tab="challenges" 
                label={isEnglish ? "Challenges" : "Thách thức"} 
              />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-white/70 dark:bg-black/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Timeline */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          {isEnglish ? 'Timeline' : 'Thời gian'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {new Date(project.startDate).toLocaleDateString()} -{' '}
                          {project.endDate
                            ? new Date(project.endDate).toLocaleDateString()
                            : isEnglish
                            ? 'Present'
                            : 'Hiện tại'}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, index) => (
                            <motion.span
                              key={index}
                              className="px-3 py-1 rounded-full text-sm font-medium bg-brand/10 text-brand dark:bg-brand/15 dark:text-brand"
                              whileHover={{ scale: 1.05 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'challenges' && (
                    <div className="space-y-6">
                      {(isEnglish ? project.challenges.en : project.challenges.vi).map(
                        (challenge, index) => (
                          <div
                            key={index}
                            className="p-4 rounded-xl bg-white/95 dark:bg-black/60 border border-gray-200 dark:border-white/10 shadow-sm"
                          >
                            <div className="flex items-start gap-3 mb-3">
                              <span className="mt-1 text-brand font-bold">•</span>
                              <h4 className="font-semibold text-gray-900 dark:text-white leading-relaxed">
                                {challenge}
                              </h4>
                            </div>
                            <div className="ml-6 pl-3 border-l-2 border-brand/55">
                              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                                {isEnglish ? project.solutions.en[index] : project.solutions.vi[index]}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t dark:border-white/10 flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                >
                  <FaGithub />
                  GitHub
                </a>
              )}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-brand text-brand hover:bg-brand/10 transition-colors dark:border-brand dark:text-brand dark:hover:bg-brand/10"
              >
                <FaExternalLinkAlt />
                {isEnglish ? 'Live Demo' : 'Xem Demo'}
              </a>
              <button
                onClick={shareProject}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-black/70 hover:bg-gray-200 dark:hover:bg-black/90 transition-colors"
              >
                <FaShare />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      {ToastComponent}
    </motion.div>
  );
}