'use client';

import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Aos from 'aos';
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

const EarthCanvas = dynamic(() => import('./canvas/Earth'), { ssr: false });

import { personalInfo } from '../data/data';

const contactInfo = {
  email: {
    label: { en: 'Email', vi: 'Email' },
    value: personalInfo.email,
  },
  phone: {
    label: { en: 'Phone', vi: 'Điện thoại' },
    value: personalInfo.phone,
  },
  address: {
    label: { en: 'Address', vi: 'Địa chỉ' },
    value: { en: personalInfo.address.en, vi: personalInfo.address.vi },
  },
};

const socialLinks = [
  {
    name: 'GitHub',
    url: personalInfo.links.github,
    icon: (
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.3 9.44 7.9 10.96.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.25-1.28-5.25-5.72 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.52.11-3.16 0 0 .97-.31 3.18 1.18a11.04 11.04 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.18-1.18 3.18-1.18.63 1.64.23 2.86.11 3.16.74.81 1.19 1.84 1.19 3.1 0 4.45-2.7 5.43-5.28 5.71.41.35.77 1.04.77 2.1 0 1.52-.02 2.74-.02 3.11 0 .31.21.67.8.56A11.51 11.51 0 0023.5 12c0-6.27-5.23-11.5-11.5-11.5z" />
    ),
  },
  {
    name: 'LinkedIn',
    url: personalInfo.links.linkedin,
    icon: (
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.3h-3v-5.6c0-1.34-.48-2.25-1.75-2.25s-2.05.91-2.05 2.25v5.6h-3v-10h3v1.36c.42-.65 1.1-1.36 2.25-1.36 1.74 0 3 1.18 3 3.3v6.7z" />
    ),
  },
  {
    name: 'Facebook',
    url: personalInfo.links.facebook,
    icon: (
      <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.793.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.59l-.467 3.622h-3.123V24h6.116C23.403 24 24 23.403 24 22.675V1.325C24 .597 23.403 0 22.675 0z" />
    ),
  },
];


export default function Contact() {
  const { isEnglish } = useLanguage();

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
          {isEnglish ? 'Contact' : 'Liên hệ'}
        </h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* 3D Earth Model */}
            <motion.div
              className="xl:h-[550px] md:h-[550px] h-[350px] cursor-grab active:cursor-grabbing"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for premium smoothness
              }}
            >
              <EarthCanvas />
            </motion.div>

            <div className="relative">
              {/* Contact Form */}
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <form className="space-y-6" action="https://formspree.io/f/xdkorozk" method="POST">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {isEnglish ? 'Name' : 'Họ và tên'}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-brand focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder={isEnglish ? 'John Doe' : 'Nguyen Van A'}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-brand focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {isEnglish ? 'Subject' : 'Tiêu đề'}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-brand focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="..."
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {isEnglish ? 'Message' : 'Nội dung'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-brand focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                      placeholder="..."
                      required
                    ></textarea>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <button
                      type="submit"
                      className="w-full bg-brand text-white px-6 py-3 rounded-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>{isEnglish ? 'Send Message' : 'Gửi tin nhắn'}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </motion.div>
                </form>
              </motion.div>

            </div>

          
          </div>
        </div>
      </div>
    </section>
  );
}