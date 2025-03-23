'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function SkillsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const skills = [
    {
      name: 'ReactJS',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
    },
    {
      name: 'HTML5',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/2048px-HTML5_logo_and_wordmark.svg.png'
    },
    {
      name: 'CSS3', 
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png'
    },
    {
      name: 'JavaScript',
      icon: 'https://www.svgrepo.com/show/373703/js.svg'
    },
    {
      name: 'NodeJS',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png'
    },
    {
      name: 'NextJS',
      icon: '/asset/nextjs.svg'
    },
    {
      name: 'MongoDB',
      icon: '/asset/mongodb.svg' 
    },
    {
      name: 'Python',
      icon: '/asset/python.svg'
    },
    {
      name: 'MySQL',
      icon: '/asset/mysql-logo.svg'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % skills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-20 bg-gradient-to-br bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-in-out transform
                ${index === currentSlide ? 'scale-125 opacity-100' : 'scale-100 opacity-40'}
              `}
            >
              <div className="relative w-16 h-16 group perspective">
                <div className="relative w-full h-full transition-all duration-500 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute backface-hidden w-full h-full">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="absolute backface-hidden w-full h-full rotate-y-180 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">{skill.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}