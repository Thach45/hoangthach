'use client';

import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Aos from 'aos';
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

const EarthCanvas = dynamic(() => import('./canvas/Earth'), { ssr: false });

import { personalInfo } from '../data/data';


import { useState } from 'react';

export default function Contact() {
  const { isEnglish } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

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
                ease: [0.22, 1, 0.36, 1]
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
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                      disabled={status === 'loading'}
                      className="w-full bg-brand text-white px-6 py-3 rounded-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <span>
                        {status === 'loading' 
                          ? (isEnglish ? 'Sending...' : 'Đang gửi...') 
                          : (isEnglish ? 'Send Message' : 'Gửi tin nhắn')}
                      </span>
                      {status !== 'loading' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      )}
                    </button>

                    {status === 'success' && (
                      <p className="mt-4 text-green-500 text-center font-medium">
                        {isEnglish ? 'Message sent successfully!' : 'Đã gửi tin nhắn thành công!'}
                      </p>
                    )}
                    {status === 'error' && (
                      <p className="mt-4 text-red-500 text-center font-medium">
                        {isEnglish ? 'Something went wrong. Please try again.' : 'Đã có lỗi xảy ra. Vui lòng thử lại.'}
                      </p>
                    )}
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