'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

interface SkillItem {
  name: string;
  icon: string;
  invert?: boolean;
  tags: string[];
  experience: string;
  description: {
    en: string;
    vi: string;
  };
}

import { skills } from '@/data/data';

const skillCategories = skills.categories;


const allSkillsCategory = {
  title: 'All',
  items: skillCategories.flatMap(category => category.items)
};

const displayCategories = [allSkillsCategory, ...skillCategories];

// Component Lục giác
const Hexagon = ({ item }: { item: SkillItem }) => (
    <div className="flex-shrink-0 mx-4 w-[160px] h-[180px] flex items-center justify-center group">
      <div className="relative w-full h-full flex items-center justify-center">
        <div 
          className="absolute w-full h-full bg-slate-100 border-2 border-slate-300 dark:bg-slate-800 dark:border-slate-700 transition-all duration-300 group-hover:border-cyan-400"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        />
        <div className="relative z-10 text-center flex flex-col items-center justify-center p-2 transition-opacity duration-300 group-hover:opacity-0">
          <Image 
            src={item.icon} 
            alt={item.name} 
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            style={item.invert ? { filter: 'invert(1)' } : {}}
          />
        </div>
        <div className="absolute z-10 text-center flex flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <Image 
              src={item.icon} 
              alt={item.name} 
              width={32}
              height={32}
              className="h-8 w-8 object-contain mb-1"
              style={item.invert ? { filter: 'invert(1)' } : {}}
            />
          <p className="text-sm font-bold text-slate-800 dark:text-white whitespace-nowrap">{item.name}</p>
          <div className="flex flex-wrap justify-center gap-1 mt-2">
              {item.tags.map((tag: string) => (
                  <span key={tag} className="px-2 py-0.5 bg-cyan-100 text-cyan-700 dark:bg-cyan-900/70 dark:text-cyan-300 text-[10px] rounded-full">
                      {tag}
                  </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

// Component Slider được cập nhật với CSS animation
const SkillSlider = ({ items, speed = '40s' }: { items: SkillItem[]; speed?: string }) => {
  const duplicatedItems = items.length > 0 ? [...items, ...items] : [];
  return (
    <div className="w-full overflow-hidden relative h-[180px] marquee-container">
      <div
        className="absolute top-0 left-0 flex marquee-content"
        style={{ animation: `marquee ${speed} linear infinite` }}
      >
        {duplicatedItems.map((item, index) => (
          <Hexagon key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

// Component Thẻ Kỹ năng cho Lưới tĩnh
const SkillCard = ({ item }: { item: SkillItem }) => {
    const { isEnglish } = useLanguage();
    return (
    <motion.div
        className="group relative overflow-hidden rounded-xl bg-white backdrop-blur-md p-6 border border-slate-200 transition-all duration-300 hover:shadow-xl hover:bg-slate-50 hover:border-cyan-400 dark:bg-slate-800/50 dark:border-slate-700/50 dark:hover:bg-slate-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 relative flex-shrink-0 mt-1">
                <Image
                    src={item.icon}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    style={item.invert ? { filter: 'invert(1)' } : {}}
                />
            </div>
            <div className="flex-1">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {item.name}
                </h4>
                {/* <div className="text-sm text-cyan-700/80 dark:text-cyan-400/80 font-medium">
                    {item.experience}
                </div> */}
            </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 h-10">
            {isEnglish ? item.description.en : item.description.vi}
        </p>
        <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag: string) => (
                <span key={tag} className="px-2.5 py-0.5 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-xs rounded-full">
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
    );
};

// Component Lưới tĩnh
const StaticSkillGrid = ({ items }: { items: SkillItem[] }) => (
    <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        {items.map((item: SkillItem) => (
            <SkillCard key={item.name} item={item} />
        ))}
    </motion.div>
);

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(displayCategories[0]);
  const [isPaused, setIsPaused] = useState(false);
  const { isEnglish } = useLanguage();

  return (
    <>
      {/* Thêm keyframes và hiệu ứng hover pause vào global style */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>
      <section id="skills" className="py-20 bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 overflow-x-hidden">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-center mb-4 gradient-text">{isEnglish ? 'My Tech Stack' : 'Kỹ năng'}</h2>
          </motion.div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {displayCategories.map(category => (
              <button key={category.title} onClick={() => setActiveCategory(category)} className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors ${activeCategory.title === category.title ? 'text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>
                {activeCategory.title === category.title && (
                  <motion.div layoutId="active-skill-tab" className="absolute inset-0 bg-brand rounded-full" transition={{ type: 'spring', stiffness: 300, damping: 30 }}/>
                )}
                <span className="relative z-10">{category.title}</span>
              </button>
            ))}
          </div>

          <div className="text-center mb-8">
              <button onClick={() => setIsPaused(!isPaused)} className="flex items-center gap-2 mx-auto px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-full hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:text-white transition-colors">
                  {isPaused ? <Play size={16} /> : <Pause size={16} />}
                  <span>{isPaused ? (isEnglish ? 'Resume Animation' : 'Tiếp tục Animation') : (isEnglish ? 'Pause Animation' : 'Dừng Animation')}</span>
              </button>
          </div>

          <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                  {isPaused ? (
                      <StaticSkillGrid key="grid" items={activeCategory.items} />
                  ) : (
                      <motion.div key="slider" exit={{ opacity: 0, y: -20 }}>
                         <SkillSlider items={activeCategory.items}  />
                      </motion.div>
                  )}
              </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

