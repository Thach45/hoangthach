import { siteConfig as dataSiteConfig, navItems as dataNavItems } from '../data/data';

export const siteConfig = {
  ...dataSiteConfig,
  author: {
    name: 'Nguyen Hoang Thach',
    email: 'nguyenhoangthach2005@gmail.com',
    phone: '0372278818',
    address: {
      vi: 'Thủ Đức, Thành phố Hồ Chí Minh',
      en: 'Thu Duc, Ho Chi Minh City',
    },
  },
  links: {
    github: 'https://github.com/Thach45',
    linkedin: 'https://www.linkedin.com/in/thach-nguyen-2005/',
    facebook: 'https://www.facebook.com/hoangthach.nguyen.5059',
  },
};

export const animations = {
  parallax: {
    planets: 0.5,
    stars: 0.3,
    mountains: 0.1,
  },
  transition: {
    duration: 300,
    ease: 'ease-in-out',
  },
  scroll: {
    offset: 100,
    smooth: true,
  },
  aos: {
    duration: 1000,
    once: true,
    easing: 'ease-in-out',
    delay: 100,
  },
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const navItems = dataNavItems.map(item => ({
  href: item.href,
  label: { vi: item.vi, en: item.en }
}));