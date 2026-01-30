'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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

interface SkillCategory {
  title: string;
  items: SkillItem[];
}

// 1. DỮ LIỆU ĐƯỢC BỔ SUNG ĐẦY ĐỦ THÔNG TIN CHO CHẾ ĐỘ XEM LƯỚI
const skillCategories = [
  {
    title: 'Frontend',
    items: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', tags: ['Hooks', 'State Management', 'Redux'], experience: '3+ Years', description: { en: 'Building complex user interfaces and state management.', vi: 'Xây dựng UI phức tạp và quản lý state hiệu quả.' } },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invert: true, tags: ['SSR', 'SSG', 'API Routes'], experience: '2+ Years', description: { en: 'Server-side rendering and static site generation.', vi: 'SSR/SSG để tối ưu SEO và hiệu năng.' } },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', tags: ['ES6+', 'DOM', 'Async/Await'], experience: '4+ Years', description: { en: 'Core language for web interactivity and logic.', vi: 'Ngôn ngữ cốt lõi cho logic và tương tác web.' } },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', tags: ['Type Safety', 'Interfaces', 'Generics'], experience: '2+ Years', description: { en: 'Enhancing code quality with static typing.', vi: 'Tăng chất lượng code nhờ type an toàn và rõ ràng.' } },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', tags: ['Utility-First', 'JIT', 'Responsive'], experience: '3+ Years', description: { en: 'Rapidly styling modern and responsive designs.', vi: 'Style nhanh, hiện đại và responsive theo utility-first.' } },
      { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg', tags: ['Animations', 'Gestures', 'Layout'], experience: '1+ Year', description: { en: 'Creating fluid and delightful animations.', vi: 'Tạo animation mượt mà, tương tác tự nhiên.' } },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg', tags: ['Runtime', 'NPM', 'Async'], experience: '3+ Years', description: { en: 'Building fast and scalable server-side applications.', vi: 'Xây dựng backend nhanh, dễ mở rộng.' } },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invert: true, tags: ['REST API', 'Middleware', 'Routing'], experience: '3+ Years', description: { en: 'Creating robust APIs and web servers.', vi: 'Thiết kế REST API và web server ổn định.' } },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', tags: ['Scripting', 'Automation', 'Data'], experience: '2+ Years', description: { en: 'Versatile language for scripting and backend logic.', vi: 'Ngôn ngữ linh hoạt cho script, automation và backend.' } },
      { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg', invert: true, tags: ['Microframework', 'Jinja2', 'APIs'], experience: '1+ Year', description: { en: 'Lightweight framework for building web services.', vi: 'Framework nhẹ để build web service nhanh.' } },
    ],
  },
  {
    title: 'Databases',
    items: [
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', tags: ['NoSQL', 'Mongoose', 'Aggregation'], experience: '2+ Years', description: { en: 'Flexible NoSQL database for modern applications.', vi: 'CSDL NoSQL linh hoạt cho ứng dụng hiện đại.' } },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', tags: ['Relational', 'SQL', 'Schema'], experience: '3+ Years', description: { en: 'Reliable relational database management.', vi: 'CSDL quan hệ ổn định, dễ vận hành.' } },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', tags: ['SQL', 'Transactions', 'ACID'], experience: '2+ Years', description: { en: 'Powerful, open-source object-relational database.', vi: 'CSDL mạnh mẽ, hỗ trợ ACID và giao dịch tốt.' } },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg', tags: ['Firestore', 'Auth', 'Realtime'], experience: '2+ Years', description: { en: 'Backend-as-a-Service platform by Google.', vi: 'BaaS của Google: Auth, Firestore và realtime.' } },
    ]
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', tags: ['Version Control', 'Branching', 'Merge'], experience: '4+ Years', description: { en: 'Essential version control system for tracking changes.', vi: 'Quản lý phiên bản, branch/merge và theo dõi thay đổi.' } },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invert: true, tags: ['CI/CD', 'Pull Requests', 'Actions'], experience: '4+ Years', description: { en: 'Platform for hosting and collaborating on Git repositories.', vi: 'Nền tảng lưu trữ code và cộng tác theo workflow.' } },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', tags: ['Containers', 'Compose', 'DevOps'], experience: '2+ Years', description: { en: 'Containerizing applications for consistency across environments.', vi: 'Đóng gói app bằng container để đồng nhất môi trường.' } },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', tags: ['Build Tool', 'HMR', 'ESM'], experience: '1+ Year', description: { en: 'Next-generation frontend tooling with a fast dev server.', vi: 'Tooling frontend nhanh với dev server và HMR.' } },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', tags: ['UI/UX Design', 'Prototyping', 'Collaboration'], experience: '3+ Years', description: { en: 'Collaborative interface design tool for teams.', vi: 'Thiết kế UI/UX, prototype và cộng tác theo team.' } },
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
          className="absolute w-full h-full bg-slate-100 border-2 border-slate-300 dark:bg-slate-800 dark:border-slate-700 transition-all duration-300 group-hover:border-cyan-400"
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
                <img
                    src={item.icon}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    style={item.invert ? { filter: 'invert(1)' } : {}}
                />
            </div>
            <div className="flex-1">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {item.name}
                </h4>
                <div className="text-sm text-cyan-700/80 dark:text-cyan-400/80 font-medium">
                    {item.experience}
                </div>
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

