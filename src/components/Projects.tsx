'use client';

import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'E-Commerce Platform',
    image: '/asset/e-commerce.png',
    description: {
      en: 'Building a complete e-commerce platform with features such as cart, payment and order management.',
      vi: 'Xây dựng nền tảng thương mại điện tử hoàn chỉnh với tính năng giỏ hàng, thanh toán và quản lý đơn hàng.',
    },
    tech: ['ExpressJS', 'Node.js', 'MongoDB'],
    link: 'https://stoneshop.vercel.app/',
    techStack: 'Node.Js, ExpressJS, Pug, MongoDB',
    status: {
      en: 'Developing',
      vi: 'Đang phát triển',
    },
  },
  {
    title: 'Finance Manager',
    image: '/asset/finace-manager.png',
    description: {
      en: 'Personal finance management application with features, login, register, expense management, borrowing, lending.',
      vi: 'Ứng dụng quản lý tài chính cá nhân với các tính năng, đăng nhập, đăng kí, quản lí chi tiêu, vay, mượn.',
    },
    tech: ['Python', 'Flask', 'Tailwind'],
    link: 'https://finace-manager.onrender.com/',
    techStack: 'Python, Flask, Tailwind',
    status: {
      en: 'Developing',
      vi: 'Đang phát triển',
    },
  },
  {
    title: 'E-Learning',
    image: '/asset/e-learning.png',
    description: {
      en: 'Online learning system with courses, lectures, quizzes, helping learners and teachers easily manage courses.',
      vi: 'Hệ thống học trực tuyến với các khóa học, bài giảng, bài kiểm tra, giúp người học và dạy dễ dàng quản lí các khóa học.',
    },
    tech: ['NextJs', 'MongoDB', 'Typescript'],
    link: '#',
    techStack: 'NextJs, Typescript, MongoDB',
    status: {
      en: 'Developing',
      vi: 'Đang phát triển',
    },
  },
];

export default function Projects() {
  const { isEnglish } = useLanguage();

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
          {isEnglish ? 'Top Projects' : 'Dự án nổi bật'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} isEnglish={isEnglish} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Component Card Dự Án
function ProjectCard({ project, isEnglish, index }: { project: any; isEnglish: boolean; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden card-hover"
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="relative overflow-hidden group">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
        />
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            {isEnglish ? project.status.en : project.status.vi}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity">
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white text-xl font-bold">{project.title}</h3>
            <p className="text-gray-300">{project.techStack}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {isEnglish ? project.description.en : project.description.vi}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {project.tech.map((tech : string, techIndex: number) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            className="text-teal-600 hover:text-teal-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            {isEnglish ? 'Details →' : 'Chi tiết →'}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
