'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Project } from '@/types/project';

interface ProjectProgressProps {
  project: Project;
  className?: string;
}

export default function ProjectProgress({ project, className = '' }: ProjectProgressProps) {
  const { isEnglish } = useLanguage();
  
  // Calculate progress based on metrics and challenges
  const calculateProgress = () => {
    const totalChallenges = project.challenges.en.length;
    const hasGithub = project.github ? 1 : 0;
    const hasDemo = project.demoVideo ? 1 : 0;
    const hasLiveLink = project.link !== '#' ? 1 : 0;
    
    const totalPoints = totalChallenges + 3; // 3 points for github, demo, and live link
    const completedPoints = project.solutions.en.length + hasGithub + hasDemo + hasLiveLink;
    
    return Math.round((completedPoints / totalPoints) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          {isEnglish ? 'Project Progress' : 'Tiến độ dự án'}
        </span>
        <span className="text-brand font-medium">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand rounded-full from-brand to-brand/50"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>
          {isEnglish ? 'Development' : 'Phát triển'}
        </span>
        {progress === 100 ? (
          <span className="text-green-500">
            {isEnglish ? 'Completed' : 'Hoàn thành'}
          </span>
        ) : (
          <span>
            {isEnglish ? 'In Progress' : 'Đang tiến hành'}
          </span>
        )}
      </div>
    </div>
  );
}