'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const navItems = [
  { href: '#home', vi: 'Trang chủ', en: 'Home' },
  { href: '#about', vi: 'Giới thiệu', en: 'About' },
  { href: '#skills', vi: 'Kỹ năng', en: 'Skills' },
  { href: '#projects', vi: 'Dự án', en: 'Projects' },
  { href: '#contact', vi: 'Liên hệ', en: 'Contact' },
];

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
    url: 'https://www.facebook.com/hoangthach.nguyen.5059',
    icon: (
      <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.793.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.59l-.467 3.622h-3.123V24h6.116C23.403 24 24 23.403 24 22.675V1.325C24 .597 23.403 0 22.675 0z" />
    ),
  },
];

export default function Footer() {
  const { isEnglish } = useLanguage();

  return (
    <footer className="bg-white dark:bg-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <Link href="#" legacyBehavior>
            <a className="text-2xl font-bold gradient-text mb-6">Portfolio</a>
          </Link>
          
          <nav className="flex flex-wrap justify-center space-x-6 mb-8">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href} legacyBehavior>
                <a className="text-gray-600 dark:text-gray-400 hover:text-brand transition-colors">
                  {isEnglish ? item.en : item.vi}
                </a>
              </Link>
            ))}
          </nav>

          <div className="flex space-x-4 mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-brand transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-center">
            © 2025 Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}