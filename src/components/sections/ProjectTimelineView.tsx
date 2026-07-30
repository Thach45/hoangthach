'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types/project';
import Image from 'next/image';
import { Calendar, Users, BookOpen, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface ProjectTimelineViewProps {
  projects: Project[];
  isEnglish: boolean;
  onProjectClick: (project: Project) => void;
}

export default function ProjectTimelineView({
  projects,
  isEnglish,
  onProjectClick,
}: ProjectTimelineViewProps) {
  // Sort projects chronologically (earliest first) to show learning growth
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(isEnglish ? 'en-US' : 'vi-VN', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="relative max-w-4xl mx-auto py-12 px-4 md:px-0">
      {/* Sleek Vertical Timeline Line with Neon Gradient */}
      <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand via-brandCyan to-brand/20 rounded-full" />

      {/* Timeline Items */}
      <div className="space-y-16">
        {sortedProjects.map((project) => {
          const isAI = project.tech.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('gemini'));
          const isBackend = project.category === 'backend';
          const nodeColor = isAI 
            ? 'border-purple-500 shadow-purple-500/50' 
            : isBackend 
              ? 'border-emerald-500 shadow-emerald-500/50' 
              : 'border-brandCyan shadow-brandCyan/50';

          return (
            <div key={project.id} className="relative pl-16 md:pl-24 group">
              {/* Timeline Center Node */}
              <div className="absolute left-8 md:left-12 top-2 transform -translate-x-1/2 z-20">
                <motion.div
                  className={`w-7 h-7 rounded-full bg-[#050505] border-[3px] ${nodeColor} flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.8)]`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <div className={`w-2 h-2 rounded-full ${isAI ? 'bg-purple-500' : isBackend ? 'bg-emerald-500' : 'bg-brandCyan'}`} />
                </motion.div>
              </div>

              {/* Floating Date Badge */}
              <div className="mb-4 flex items-center gap-3">
                <span className="text-sm font-black text-brandCyan bg-brandCyan/10 border border-brandCyan/20 px-3.5 py-1 rounded-full tracking-wider uppercase">
                  {formatDate(project.startDate)}
                </span>
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                  {isEnglish ? project.category : project.category === 'backend' ? 'Hậu kỳ / Backend' : project.category === 'frontend' ? 'Tiền kỳ / Frontend' : 'Toàn diện / Fullstack'}
                </span>
              </div>

              {/* Sleek Horizontal Timeline Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                onClick={() => onProjectClick(project)}
                className="relative bg-white/[0.02] backdrop-blur-md rounded-3xl border border-white/10 p-6 md:p-8 cursor-pointer hover:bg-white/[0.04] hover:border-brand/40 shadow-2xl transition-all duration-300 flex flex-col gap-6 overflow-hidden"
              >
                {/* Neon glow effect in background */}
                <div className="absolute -right-20 -top-20 w-48 h-48 bg-brand/5 blur-[80px] rounded-full opacity-50 pointer-events-none" />

                {/* Card Title & Meta Info */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-brandCyan transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-white/50">
                      {project.team && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-brand" />
                          {isEnglish ? project.team.en : project.team.vi}
                        </span>
                      )}
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-brandCyan" />
                        {formatDate(project.startDate)} {project.endDate ? ` - ${formatDate(project.endDate)}` : ` - ${isEnglish ? 'Present' : 'Hiện tại'}`}
                      </span>
                    </div>
                  </div>

                  {project.image && (
                    <div className="relative w-full md:w-36 aspect-[16/10] md:aspect-video rounded-xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {isEnglish ? project.description.en : project.description.vi}
                </p>

                {/* Grid Layout for Lessons & Experience */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  {/* Left: Lessons Learned */}
                  {project.lessons && project.lessons.vi.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brandCyan flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        {isEnglish ? 'Key Lessons' : 'Bài học rút ra'}
                      </h4>
                      <ul className="space-y-2">
                        {(isEnglish ? project.lessons.en : project.lessons.vi).map((lesson, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/80 mt-0.5 flex-shrink-0" />
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Right: Experience Accumulated */}
                  {project.experience && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4" />
                        {isEnglish ? 'Experience Accumulated' : 'Kinh nghiệm tích lũy'}
                      </h4>
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-xs text-gray-300 leading-relaxed italic relative">
                        <span className="text-brand text-lg font-serif absolute top-1 left-2">“</span>
                        <p className="pl-4">
                          {isEnglish ? project.experience.en : project.experience.vi}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer tags and action button */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 mt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-white/5 text-gray-400 border border-white/5"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 self-end">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-brand transition-colors p-1"
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                    )}
                    <span className="flex items-center gap-1 text-[10px] font-bold text-white/40 group-hover:text-white transition-colors duration-300">
                      {isEnglish ? 'VIEW DETAILS' : 'CHI TIẾT DỰ ÁN'}
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
