'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';

const skills = [
  {
    name: 'Web Development',
    icon: '/asset/globe.svg',
    description: {
      en: 'Building modern web applications with cutting-edge technologies',
      vi: 'Xây dựng ứng dụng web hiện đại với công nghệ tiên tiến'
    },
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    color: '#38BDF8'
  },
  {
    name: 'Backend Development',
    icon: '/asset/window.svg',
    description: {
      en: 'Creating robust and scalable server-side solutions',
      vi: 'Tạo giải pháp server mạnh mẽ và có khả năng mở rộng'
    },
    techs: ['Node.js', 'Express', 'Python', 'Flask'],
    color: '#22C55E'
  },
  {
    name: 'Database Management',
    icon: '/asset/file.svg',
    description: {
      en: 'Designing and optimizing database structures',
      vi: 'Thiết kế và tối ưu hóa cấu trúc cơ sở dữ liệu'
    },
    techs: ['MongoDB', 'MySQL', 'Redis', 'PostgreSQL'],
    color: '#F59E0B'
  }
];

export default function SkillsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isEnglish } = useLanguage();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % skills.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="group perspective-1000">
                <motion.div
                  className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl transform-gpu preserve-3d hover:rotate-y-12 transition-transform duration-500"
                  style={{
                    backgroundImage: `radial-gradient(circle at top right, ${skills[currentSlide].color}15, transparent 70%)`
                  }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
                      <Image
                        src={skills[currentSlide].icon}
                        alt={skills[currentSlide].name}
                        fill
                        className="object-contain transform-gpu transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-brand-gradient">
                        {skills[currentSlide].name}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {isEnglish 
                          ? skills[currentSlide].description.en 
                          : skills[currentSlide].description.vi
                        }
                      </p>
                      
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {skills[currentSlide].techs.map((tech, index) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-4 py-2 rounded-full text-sm font-medium bg-brand/10 text-brand dark:text-brand border border-brand/20"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {skills.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                          index === currentSlide 
                            ? 'bg-brand' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}