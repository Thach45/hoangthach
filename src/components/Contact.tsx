'use client';

import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Aos from 'aos';
import { motion } from "framer-motion";

const contactInfo = {
  email: {
    label: { en: 'Email', vi: 'Email' },
    value: 'nguyenhoangthach2005@gmail.com',
  },
  phone: {
    label: { en: 'Phone', vi: 'Điện thoại' },
    value: '0372278818',
  },
  address: {
    label: { en: 'Address', vi: 'Địa chỉ' },
    value: { en: 'Thu Duc, Ho Chi Minh City', vi: 'Thủ Đức, Thành phố Hồ Chí Minh' },
  },
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
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {isEnglish ? 'Contact Information' : 'Thông tin liên hệ'}
              </h3>
              <div className="space-y-4">
                {Object.entries(contactInfo).map(([key, info]) => (
                  <div key={key} className="flex items-start space-x-4">
                    <svg className="w-6 h-6 text-teal-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {key === 'email' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      )}
                      {key === 'phone' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      )}
                      {key === 'address' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      )}
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        {info.label[isEnglish ? 'en' : 'vi']}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {typeof info.value === 'string' ? info.value : info.value[isEnglish ? 'en' : 'vi']}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {isEnglish ? 'Social Links' : 'Liên kết mạng xã hội'}
              </h3>
              <motion.div
                className="flex space-x-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Social Links */}
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-8 glass-morphism"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    placeholder="..."
                    required
                  ></textarea>
                </div>
                <motion.div
                  
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <button
                    type="submit"
                    className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
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
    </section>
  );
}