'use client';

import { motion } from 'framer-motion';
import { projects, skills, personalInfo } from '@/data/data';
import { Mail, Phone, ExternalLink, Github, Linkedin, Facebook } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface WidgetProps {
  isEnglish: boolean;
}

export function WidgetProjects({ isEnglish }: WidgetProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-1 mask-horizontal custom-scrollbar">
      {projects.map((project, idx) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="min-w-[260px] max-w-[260px] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm flex flex-col"
        >
          <div className="h-32 bg-gray-200 dark:bg-gray-800 relative w-full overflow-hidden">
             {/* Note: since project.image might be external, we can just use a standard img or next/image with domains configured. We'll use img for safety. */}
            <img src={project.image} alt={project.title} className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity" />
          </div>
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{project.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
              {isEnglish ? project.description.en : project.description.vi}
            </p>
            <div className="mt-auto flex gap-2">
              {project.link !== '#' && (
                <Link href={project.link} target="_blank" className="flex items-center justify-center flex-1 py-1.5 bg-brand/10 text-brand rounded-lg text-xs font-medium hover:bg-brand/20 transition-colors">
                  Demo
                </Link>
              )}
              {project.github && (
                <Link href={project.github} target="_blank" className="flex items-center justify-center flex-1 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                  Github
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function WidgetSkills({ isEnglish }: WidgetProps) {
  return (
    <div className="flex flex-col gap-3 mt-2">
      {skills.categories.slice(0, 2).map((category, idx) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-3 rounded-xl"
        >
          <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">{category.title}</h4>
          <div className="flex flex-wrap gap-1.5">
            {category.items.map(item => (
              <span key={item.name} className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 text-[11px] rounded-md flex items-center gap-1.5">
                <img src={item.icon} alt={item.name} className={`w-3 h-3 ${item.invert ? 'dark:invert' : ''}`} />
                {item.name}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function WidgetContact({ isEnglish }: WidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-2 mt-2 max-w-sm"
    >
      <Link href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl hover:bg-brand/5 dark:hover:bg-brand/10 transition-colors group">
        <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand">
          <Mail size={16} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-brand transition-colors">{personalInfo.email}</p>
        </div>
      </Link>
      
      <Link href={`tel:${personalInfo.phone}`} className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl hover:bg-brand/5 dark:hover:bg-brand/10 transition-colors group">
        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
          <Phone size={16} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-green-500 transition-colors">{personalInfo.phone}</p>
        </div>
      </Link>

      <div className="flex gap-2 mt-1">
        <Link href={personalInfo.links.github} target="_blank" className="flex-1 py-2 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-medium flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
          <Github size={14} /> Github
        </Link>
        <Link href={personalInfo.links.linkedin} target="_blank" className="flex-1 py-2 bg-[#0077b5]/10 text-[#0077b5] dark:text-[#0077b5] rounded-lg text-xs font-medium flex items-center justify-center gap-2 hover:bg-[#0077b5]/20 transition-colors">
          <Linkedin size={14} /> LinkedIn
        </Link>
      </div>
    </motion.div>
  );
}

export function WidgetAbout({ isEnglish }: WidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-brand/10 to-transparent dark:from-brand/20 dark:to-transparent border border-brand/20 p-4 rounded-2xl mt-2 max-w-sm"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm shrink-0">
          <Image src={personalInfo.avatar} alt="Avatar" width={48} height={48} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">{isEnglish ? personalInfo.name.en : personalInfo.name.vi}</h3>
          <p className="text-brand text-xs font-medium mb-1">{isEnglish ? personalInfo.title.en : personalInfo.title.vi}</p>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
            {isEnglish ? personalInfo.bio.en : personalInfo.bio.vi}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
