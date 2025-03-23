export const siteConfig = {
  name: 'Hoang Thach Portfolio',
  description: 'Backend Developer Portfolio of Nguyen Hoang Thach',
  url: 'https://hoangthach.vercel.app',
  ogImage: '/asset/og.jpg',
  links: {
    github: 'https://github.com/Thach45',
    linkedin: 'https://www.linkedin.com/in/thach-nguyen-2005/',
    facebook: 'https://www.facebook.com/hoangthach.nguyen.5059',
  },
  author: {
    name: 'Nguyen Hoang Thach',
    email: 'nguyenhoangthach2005@gmail.com',
    phone: '0372278818',
    address: {
      vi: 'Thủ Đức, Thành phố Hồ Chí Minh',
      en: 'Thu Duc, Ho Chi Minh City',
    },
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

export const navItems = [
  {
    href: '#home',
    label: { vi: 'Trang chủ', en: 'Home' },
  },
  {
    href: '#about',
    label: { vi: 'Giới thiệu', en: 'About' },
  },
  {
    href: '#skills',
    label: { vi: 'Kỹ năng', en: 'Skills' },
  },
  {
    href: '#projects',
    label: { vi: 'Dự án', en: 'Projects' },
  },
  {
    href: '#contact',
    label: { vi: 'Liên hệ', en: 'Contact' },
  },
];

export const skills = {
  frontend: [
    { name: 'JavaScript', progress: 70 },
    { name: 'React', progress: 65 },
    { name: 'Next.js', progress: 70 },
  ],
  backend: [
    { name: 'Node.js/Express.js', progress: 80 },
    { name: 'Python/Flask', progress: 75 },
  ],
  database: [
    { name: 'MongoDB', progress: 85 },
    { name: 'MySQL', progress: 75 },
  ],
};

export const projects = [
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
    status: { en: 'Developing', vi: 'Đang phát triển' },
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
    status: { en: 'Developing', vi: 'Đang phát triển' },
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
    status: { en: 'Developing', vi: 'Đang phát triển' },
  },
];