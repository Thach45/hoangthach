'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const contactInfo = {
  email: 'nguyenhoangthach2005@gmail.com',
  phone: '0372278818',
};

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Thach45',
    icon: (
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.3 9.44 7.9 10.96.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.25-1.28-5.25-5.72 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.52.11-3.16 0 0 .97-.31 3.18 1.18a11.04 11.04 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.18-1.18 3.18-1.18.63 1.64.23 2.86.11 3.16.74.81 1.19 1.84 1.19 3.1 0 4.45-2.7 5.43-5.28 5.71.41.35.77 1.04.77 2.1 0 1.52-.02 2.74-.02 3.11 0 .31.21.67.8.56A11.51 11.51 0 0023.5 12c0-6.27-5.23-11.5-11.5-11.5z" />
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/thach-nguyen-2005/',
    icon: (
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.3h-3v-5.6c0-1.34-.48-2.25-1.75-2.25s-2.05.91-2.05 2.25v5.6h-3v-10h3v1.36c.42-.65 1.1-1.36 2.25-1.36 1.74 0 3 1.18 3 3.3v6.7z" />
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/hoangthach.nguyen.5059/',
    icon: (
      <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.793.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.59l-.467 3.622h-3.123V24h6.116C23.403 24 24 23.403 24 22.675V1.325C24 .597 23.403 0 22.675 0z" />
    ),
  },
];

export default function FixedContactBar() {
  const { isEnglish } = useLanguage();

  return (
    <motion.div 
      className="fixed bottom-8 left-8 z-[100] hidden xl:flex flex-col gap-4"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      {[
        { id: 'email', href: `mailto:${contactInfo.email}`, icon: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" fill="none" />, name: 'Email' },
        { id: 'phone', href: `tel:${contactInfo.phone}`, icon: <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" fill="none" />, name: 'Phone' },
        ...socialLinks
      ].map((item, index) => (
        <motion.a
          key={index}
          href={'url' in item ? item.url : item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-full shadow-xl border border-white/20 dark:border-white/10 text-white hover:bg-brand hover:text-white dark:hover:bg-brand transition-all duration-300 group"
          whileHover={{ scale: 1.1, x: 10 }}
          title={'name' in item ? item.name : ''}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            {item.icon}
          </svg>
        </motion.a>
      ))}
      <div className="w-px h-24 bg-gradient-to-t from-brand to-transparent self-center mt-2 opacity-50" />
    </motion.div>
  );
}
