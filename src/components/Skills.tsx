'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AOS from 'aos';
import SkillsSlider from './SkillsSlider';

export default function Skills() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text vn">Kỹ năng</h2>
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text en hidden">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <SkillCard title="Frontend Development" delay={0.1} skills={[
            { name: "JavaScript", level: 70 },
            { name: "React", level: 65 },
            { name: "Next.js", level: 70 }
          ]} />

          <SkillCard title="Backend Development" delay={0.2} skills={[
            { name: "Node.js/Express.js", level: 80 },
            { name: "Python/Flask", level: 75 }
          ]} />

          <SkillCard title="Data" delay={0.3} skills={[
            { name: "MongoDB", level: 85 },
            { name: "MySQL", level: 75 }
          ]} />

        </div>
      </div>
      <SkillsSlider />
    </section>
  );
}

// Component Card kỹ năng
function SkillCard({ title, delay, skills }: { title: string; delay: number; skills: { name: string; level: number }[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div 
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      <h3 className="text-xl font-semibold dark:text-white">{title}</h3>
      <div className="space-y-3 mt-4">
        {skills.map((skill, index) => (
          <SkillBar key={index} name={skill.name} level={skill.level} isInView={isInView} />
        ))}
      </div>
    </motion.div>
  );
}

// Component hiển thị thanh kỹ năng
function SkillBar({ name, level, isInView }: { name: string; level: number; isInView: boolean }) {
  return (
    <div className="relative pt-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{name}</span>
        <span className="text-sm font-medium text-teal-600">{level}%</span>
      </div>
      <div className="overflow-hidden h-2 bg-gray-200 rounded">
        <motion.div 
          className="h-full bg-teal-600 rounded"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
}
