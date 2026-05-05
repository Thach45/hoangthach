'use client';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';



import { personalInfo, skills } from '../data/data';

export default function About() {
  const { isEnglish } = useLanguage();
  const summarySkills = skills.categories.flatMap(cat => cat.items).map(item => item.name).slice(0, 6);

  return (
      <section id="about" className="py-20 relative overflow-hidden bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
        
          <h2 
            className="text-4xl font-bold text-center mb-16 gradient-text"
          >
            {isEnglish ? 'About' : 'Về tôi'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
            {/* Avatar */}
            <div className="w-full h-64 flex items-center justify-center ">
              <Image
                src={personalInfo.avatar}
                alt="avatar"
                width={300}
                height={300}
                className="rounded-full object-cover"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))',
                }}
              />
            </div>

            {/* Thông tin */}
            <motion.div 
              className="space-y-6 relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {isEnglish ? personalInfo.bio.en : personalInfo.bio.vi}
              </p>

              {/* Kỹ năng */}
              <div className="flex flex-wrap gap-4">
                {summarySkills.map((skill, index) => (
                  <motion.span 
                    key={index}
                    className="px-4 py-2 bg-brand/10 dark:bg-brand/15 text-brand dark:text-brand rounded-full"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Nút liên hệ */}
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Link href="#contact" className="px-6 py-3 bg-brand text-white rounded-full hover:brightness-110 transition-all font-bold">
                  {isEnglish ? 'Contact now' : 'Liên hệ ngay'}
                </Link>
                
                <Link 
                  href="/talk-with-me" 
                  className="px-6 py-3 border-2 border-brand text-brand rounded-full hover:bg-brand hover:text-white transition-all font-bold flex items-center gap-2 group"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand"></span>
                  </span>
                  {isEnglish ? 'Talk with me' : 'Trò chuyện cùng tôi'}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
  );
}