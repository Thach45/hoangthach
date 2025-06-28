'use client';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

import Image from 'next/image';
import RubikCubeExplosion from './RubikCubeExplosion';


const skills = [
  'HTML/CSS',
  'NodeJs/ExpressJS',
  'React',
  'NextJs',
  'Python'
];

export default function About() {
  const { isEnglish } = useLanguage();

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
      
        <h2 
          className="text-4xl font-bold text-center mb-16 gradient-text"
         
        >
          {isEnglish ? 'About' : 'Về tôi'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12  flex items-center relative">
          {/* Avatar */}
          {/* <RubikCubeExplosion /> */}
          <div className="w-full h-64 flex items-center justify-center ">
            <Image
              src="/asset/anh2.png"
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
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {isEnglish ? (
                <>
                  Hello! I&apos;m Nguyen Hoang Thach, a 20-year-old sophomore at HCMUTE majoring in Information Technology.
                  I&apos;m passionate about Backend Web Development and AI. This is where I share my completed projects, 
                  and I&apos;m glad you&apos;re here!
                </>
              ) : (
                <>
                  Xin chào! Mình là Nguyễn Hoàng Thạch, 20 tuổi, hiện đang là sinh viên năm 2 tại HCMUTE 
                  chuyên ngành Công nghệ Thông tin. Mình yêu thích lập trình Backend Web và AI. 
                  Đây là nơi mình chia sẻ các dự án đã thực hiện, rất vui nếu bạn ghé qua!
                </>
              )}
            </p>

            {/* Kỹ năng */}
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <motion.span 
                  key={index}
                  className="px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: false }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Nút liên hệ */}
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Link href="#contact" className="px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition">
                {isEnglish ? 'Contact now' : 'Liên hệ ngay'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}