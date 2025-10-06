'use client';

import { useLanguage } from '../context/LanguageContext';
import { Project } from '../types/project';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaGithub, FaShare, FaPlay, FaPause, FaExternalLinkAlt } from 'react-icons/fa';
import { useState, useRef } from 'react';
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
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'metrics'>('overview');
  const videoRef = useRef<HTMLVideoElement>(null);

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
        videoRef.current.play().catch(console.error);
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const TabButton = ({ tab, label }: { tab: typeof activeTab; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        activeTab === tab
          ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
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
        className="relative w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row h-[80vh]">
          {/* Left Side - Media Content */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-auto">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                <LoadingSpinner />
              </div>
            )}
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              onLoadingComplete={() => setIsImageLoading(false)}
            />
            {project.demoVideo && (
              <div className="absolute inset-0">
                <video
                  ref={videoRef}
                  src={project.demoVideo}
                  className={`w-full h-full object-cover ${isVideoPlaying ? 'block' : 'hidden'}`}
                  onLoadedData={() => setIsVideoLoading(false)}
                />
                <button
                  onClick={toggleVideo}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition-all group"
                >
                  {isVideoLoading ? (
                    <LoadingSpinner className="text-white" />
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
                    >
                      {isVideoPlaying ? (
                        <FaPause className="w-6 h-6 text-white" />
                      ) : (
                        <FaPlay className="w-6 h-6 text-white ml-1" />
                      )}
                    </motion.div>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Side - Project Details */}
          <div className="relative flex-1 flex flex-col h-full">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <IoClose size={20} />
            </button>

            {/* Header */}
            <div className="p-6 border-b dark:border-gray-700">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                {project.title}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {isEnglish ? project.description.en : project.description.vi}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-4 border-b dark:border-gray-700">
              <TabButton 
                tab="overview" 
                label={isEnglish ? "Overview" : "Tổng quan"} 
              />
              <TabButton 
                tab="challenges" 
                label={isEnglish ? "Challenges" : "Thách thức"} 
              />
              <TabButton 
                tab="metrics" 
                label={isEnglish ? "Metrics" : "Chỉ số"} 
              />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
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
                              className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-teal-500/10 to-blue-500/10 text-teal-600 dark:text-teal-400"
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
                          <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                            <div className="flex items-start gap-3 mb-3">
                              <span className="mt-1 text-teal-500">•</span>
                              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                                {challenge}
                              </h4>
                            </div>
                            <div className="ml-6 pl-3 border-l-2 border-teal-500/30">
                              <p className="text-gray-600 dark:text-gray-400">
                                {isEnglish ? project.solutions.en[index] : project.solutions.vi[index]}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {activeTab === 'metrics' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-lg bg-gradient-to-br from-teal-500/10 to-blue-500/10">
                        <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                          {project.metrics.commits}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Commits</div>
                      </div>
                      <div className="p-6 rounded-lg bg-gradient-to-br from-teal-500/10 to-blue-500/10">
                        <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                          {project.metrics.pullRequests}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Pull Requests</div>
                      </div>
                      <div className="p-6 rounded-lg bg-gradient-to-br from-teal-500/10 to-blue-500/10">
                        <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                          {project.metrics.issues}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Issues</div>
                      </div>
                      <div className="p-6 rounded-lg bg-gradient-to-br from-teal-500/10 to-blue-500/10">
                        <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                          {Math.round(project.metrics.timeSpent / 24)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {isEnglish ? 'Days Spent' : 'Ngày làm việc'}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t dark:border-gray-700 flex gap-3">
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
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 transition-colors"
              >
                <FaExternalLinkAlt />
                {isEnglish ? 'Live Demo' : 'Xem Demo'}
              </a>
              <button
                onClick={shareProject}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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