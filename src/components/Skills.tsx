'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface SkillItem {
  name: string;
  icon: string;
  invert?: boolean;
  tags: string[];
  experience: string;
  description: string;
}

interface SkillCategory {
  title: string;
  items: SkillItem[];
}

// 1. DỮ LIỆU ĐƯỢC BỔ SUNG ĐẦY ĐỦ THÔNG TIN CHO CHẾ ĐỘ XEM LƯỚI
const skillCategories = [
  {
    title: 'Frontend',
    items: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', tags: ['Hooks', 'State Management', 'Redux'], experience: '3+ Years', description: 'Building complex user interfaces and state management.' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invert: true, tags: ['SSR', 'SSG', 'API Routes'], experience: '2+ Years', description: 'Server-side rendering and static site generation.' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', tags: ['ES6+', 'DOM', 'Async/Await'], experience: '4+ Years', description: 'Core language for web interactivity and logic.' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', tags: ['Type Safety', 'Interfaces', 'Generics'], experience: '2+ Years', description: 'Enhancing code quality with static typing.' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', tags: ['Utility-First', 'JIT', 'Responsive'], experience: '3+ Years', description: 'Rapidly styling modern and responsive designs.' },
      { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg', tags: ['Animations', 'Gestures', 'Layout'], experience: '1+ Year', description: 'Creating fluid and delightful animations.' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg', tags: ['Runtime', 'NPM', 'Async'], experience: '3+ Years', description: 'Building fast and scalable server-side applications.' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invert: true, tags: ['REST API', 'Middleware', 'Routing'], experience: '3+ Years', description: 'Creating robust APIs and web servers.' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', tags: ['Scripting', 'Automation', 'Data'], experience: '2+ Years', description: 'Versatile language for scripting and backend logic.' },
      { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg', invert: true, tags: ['Microframework', 'Jinja2', 'APIs'], experience: '1+ Year', description: 'Lightweight framework for building web services.' },
    ],
  },
  {
    title: 'Databases',
    items: [
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', tags: ['NoSQL', 'Mongoose', 'Aggregation'], experience: '2+ Years', description: 'Flexible NoSQL database for modern applications.' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', tags: ['Relational', 'SQL', 'Schema'], experience: '3+ Years', description: 'Reliable relational database management.' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', tags: ['SQL', 'Transactions', 'ACID'], experience: '2+ Years', description: 'Powerful, open-source object-relational database.' },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg', tags: ['Firestore', 'Auth', 'Realtime'], experience: '2+ Years', description: 'Backend-as-a-Service platform by Google.' },
    ]
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', tags: ['Version Control', 'Branching', 'Merge'], experience: '4+ Years', description: 'Essential version control system for tracking changes.' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invert: true, tags: ['CI/CD', 'Pull Requests', 'Actions'], experience: '4+ Years', description: 'Platform for hosting and collaborating on Git repositories.' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', tags: ['Containers', 'Compose', 'DevOps'], experience: '2+ Years', description: 'Containerizing applications for consistency across environments.' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', tags: ['Build Tool', 'HMR', 'ESM'], experience: '1+ Year', description: 'Next-generation frontend tooling with a fast dev server.' },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', tags: ['UI/UX Design', 'Prototyping', 'Collaboration'], experience: '3+ Years', description: 'Collaborative interface design tool for teams.' },
    ],
  },
];

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
          className="absolute w-full h-full bg-slate-800 border-2 border-slate-700 transition-all duration-300 group-hover:border-cyan-400"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        />
        <div className="relative z-10 text-center flex flex-col items-center justify-center p-2 transition-opacity duration-300 group-hover:opacity-0">
          <img 
            src={item.icon} 
            alt={item.name} 
            className="h-12 w-12 object-contain"
            style={item.invert ? { filter: 'invert(1)' } : {}}
          />
        </div>
        <div className="absolute z-10 text-center flex flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <img 
              src={item.icon} 
              alt={item.name} 
              className="h-8 w-8 object-contain mb-1"
              style={item.invert ? { filter: 'invert(1)' } : {}}
            />
          <p className="text-sm font-bold text-white whitespace-nowrap">{item.name}</p>
          <div className="flex flex-wrap justify-center gap-1 mt-2">
              {item.tags.map((tag: string) => (
                  <span key={tag} className="px-2 py-0.5 bg-cyan-900/70 text-cyan-300 text-[10px] rounded-full">
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
const SkillCard = ({ item }: { item: SkillItem }) => (
    <motion.div
        className="group relative overflow-hidden rounded-xl bg-slate-800/50 backdrop-blur-md p-6 border border-slate-700/50 transition-all duration-300 hover:shadow-xl hover:bg-slate-800 hover:border-cyan-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 relative flex-shrink-0 mt-1">
                <img
                    src={item.icon}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    style={item.invert ? { filter: 'invert(1)' } : {}}
                />
            </div>
            <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {item.name}
                </h4>
                <div className="text-sm text-cyan-400/80 font-medium">
                    {item.experience}
                </div>
            </div>
        </div>
        <p className="text-sm text-slate-400 mb-4 h-10">
            {item.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag: string) => (
                <span key={tag} className="px-2.5 py-0.5 bg-slate-700 text-slate-300 text-xs rounded-full">
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
);

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
      <section id="skills" className="py-24 bg-slate-900 text-slate-300 overflow-x-hidden">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white">My Tech Stack</h2>
            <p className="mt-4 text-lg text-slate-400">An interactive showcase of my technical skills.</p>
          </motion.div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {displayCategories.map(category => (
              <button key={category.title} onClick={() => setActiveCategory(category)} className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors ${activeCategory.title === category.title ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                {activeCategory.title === category.title && (
                  <motion.div layoutId="active-skill-tab" className="absolute inset-0 bg-cyan-500/30 rounded-full" transition={{ type: 'spring', stiffness: 300, damping: 30 }}/>
                )}
                <span className="relative z-10">{category.title}</span>
              </button>
            ))}
          </div>

          <div className="text-center mb-8">
              <button onClick={() => setIsPaused(!isPaused)} className="flex items-center gap-2 mx-auto px-4 py-2 text-sm font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-full hover:bg-slate-700 hover:text-white transition-colors">
                  {isPaused ? <Play size={16} /> : <Pause size={16} />}
                  <span>{isPaused ? 'Resume Animation' : 'Pause Animation'}</span>
              </button>
          </div>

          <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                  {isPaused ? (
                      <StaticSkillGrid key="grid" items={activeCategory.items} />
                  ) : (
                      <motion.div key="slider" exit={{ opacity: 0, y: -20 }}>
                         <SkillSlider items={activeCategory.items} speed={`${activeCategory.items.length * 3}s`} />
                      </motion.div>
                  )}
              </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

