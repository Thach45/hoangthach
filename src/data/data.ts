import { Project } from '@/types/project';
import { Imprint } from '@/types/imprint';
import React from 'react';

export const personalInfo = {
  name: {
    vi: 'Nguyễn Hoàng Thạch',
    en: 'Nguyen Hoang Thach',
  },
  title: {
    vi: 'Lập trình viên Backend',
    en: 'Backend Developer',
  },
  bio: {
    vi: 'Xin chào! Mình là Nguyễn Hoàng Thạch, 20 tuổi, hiện đang là sinh viên năm 3 tại HCMUTE chuyên ngành Công nghệ Thông tin. Mình yêu thích lập trình Backend Web và AI. Đây là nơi mình chia sẻ các dự án đã thực hiện, rất vui nếu bạn ghé qua!',
    en: "Hello! I'm Nguyen Hoang Thach, a 20-year-old third-year student at HCMUTE majoring in Information Technology. I'm passionate about Backend Web Development and AI. This is where I share my completed projects, and I'm glad you're here!",
  },
  email: 'nguyenhoangthach2005@gmail.com',
  phone: '0372278818',
  address: {
    vi: 'Thủ Đức, Thành phố Hồ Chí Minh',
    en: 'Thu Duc, Ho Chi Minh City',
  },
  avatar: '/asset/anh2.png',
  cv: {
    backend: '/cv.pdf',
    fullstack: '/cv_fullstack.pdf',
  },
  links: {
    github: 'https://github.com/Thach45',
    linkedin: 'https://www.linkedin.com/in/thach-nguyen-2005/',
    facebook: 'https://www.facebook.com/hoangthach.nguyen.5059',
  },
};

export const siteConfig = {
  name: 'Hoang Thach Portfolio',
  description: 'Backend Developer Portfolio of Nguyen Hoang Thach',
  url: 'https://hoangthach.vercel.app',
  ogImage: '/asset/og.jpg',
};

export const navItems = [
  { href: '#home', vi: 'Trang chủ', en: 'Home' },
  { href: '#about', vi: 'Giới thiệu', en: 'About' },
  { href: '#skills', vi: 'Kỹ năng', en: 'Skills' },
  { href: '#imprints', vi: 'Dấu ấn', en: 'Imprints' },
  { href: '#projects', vi: 'Dự án', en: 'Projects' },
  { href: '/talk-with-me', vi: 'Trò chuyện', en: 'Talk With Me' },
  { href: '#contact', vi: 'Liên hệ', en: 'Contact' },
];

export const heroText = {
  greetings: {
    vi: 'Xin chào, tôi là',
    en: 'Hello, I am',
  },
  exploreBtn: {
    vi: 'Khám phá dự án',
    en: 'Explore Projects',
  },
};

export const skills = {
  categories: [
    {
      title: 'Frontend',
      items: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', tags: ['Hooks', 'State Management', 'Redux'], experience: '3+ Years', description: { en: 'Building complex user interfaces and state management.', vi: 'Xây dựng UI phức tạp và quản lý state hiệu quả.' } },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invert: true, tags: ['SSR', 'SSG', 'API Routes'], experience: '2+ Years', description: { en: 'Server-side rendering and static site generation.', vi: 'SSR/SSG để tối ưu SEO và hiệu năng.' } },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', tags: ['ES6+', 'DOM', 'Async/Await'], experience: '4+ Years', description: { en: 'Core language for web interactivity and logic.', vi: 'Ngôn ngữ cốt lõi cho logic và tương tác web.' } },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', tags: ['Type Safety', 'Interfaces', 'Generics'], experience: '2+ Years', description: { en: 'Enhancing code quality with static typing.', vi: 'Tăng chất lượng code nhờ type an toàn và rõ ràng.' } },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', tags: ['Utility-First', 'JIT', 'Responsive'], experience: '3+ Years', description: { en: 'Rapidly styling modern and responsive designs.', vi: 'Style nhanh, hiện đại và responsive theo utility-first.' } },
        { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg', tags: ['Animations', 'Gestures', 'Layout'], experience: '1+ Year', description: { en: 'Creating fluid and delightful animations.', vi: 'Tạo animation mượt mà, tương tác tự nhiên.' } },
      ],
    },
    {
      title: 'Backend',
      items: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg', tags: ['Runtime', 'NPM', 'Async'], experience: '3+ Years', description: { en: 'Building fast and scalable server-side applications.', vi: 'Xây dựng backend nhanh, dễ mở rộng.' } },
        { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invert: true, tags: ['REST API', 'Middleware', 'Routing'], experience: '3+ Years', description: { en: 'Creating robust APIs and web servers.', vi: 'Thiết kế REST API và web server ổn định.' } },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', tags: ['Scripting', 'Automation', 'Data'], experience: '2+ Years', description: { en: 'Versatile language for scripting and backend logic.', vi: 'Ngôn ngữ linh hoạt cho script, automation và backend.' } },
        { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg', invert: true, tags: ['Microframework', 'Jinja2', 'APIs'], experience: '1+ Year', description: { en: 'Lightweight framework for building web services.', vi: 'Framework nhẹ để build web service nhanh.' } },
      ],
    },
    {
      title: 'Databases',
      items: [
          { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', tags: ['NoSQL', 'Mongoose', 'Aggregation'], experience: '2+ Years', description: { en: 'Flexible NoSQL database for modern applications.', vi: 'CSDL NoSQL linh hoạt cho ứng dụng hiện đại.' } },
          { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', tags: ['Relational', 'SQL', 'Schema'], experience: '3+ Years', description: { en: 'Reliable relational database management.', vi: 'CSDL quan hệ ổn định, dễ vận hành.' } },
          { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', tags: ['SQL', 'Transactions', 'ACID'], experience: '2+ Years', description: { en: 'Powerful, open-source object-relational database.', vi: 'CSDL mạnh mẽ, hỗ trợ ACID và giao dịch tốt.' } },
          { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg', tags: ['Firestore', 'Auth', 'Realtime'], experience: '2+ Years', description: { en: 'Backend-as-a-Service platform by Google.', vi: 'BaaS của Google: Auth, Firestore và realtime.' } },
      ]
    },
    {
      title: 'Tools',
      items: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', tags: ['Version Control', 'Branching', 'Merge'], experience: '4+ Years', description: { en: 'Essential version control system for tracking changes.', vi: 'Quản lý phiên bản, branch/merge và theo dõi thay đổi.' } },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invert: true, tags: ['CI/CD', 'Pull Requests', 'Actions'], experience: '4+ Years', description: { en: 'Platform for hosting and collaborating on Git repositories.', vi: 'Nền tảng lưu trữ code và cộng tác theo workflow.' } },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', tags: ['Containers', 'Compose', 'DevOps'], experience: '2+ Years', description: { en: 'Containerizing applications for consistency across environments.', vi: 'Đóng gói app bằng container để đồng nhất môi trường.' } },
        { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', tags: ['Build Tool', 'HMR', 'ESM'], experience: '1+ Year', description: { en: 'Next-generation frontend tooling with a fast dev server.', vi: 'Tooling frontend nhanh với dev server và HMR.' } },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', tags: ['UI/UX Design', 'Prototyping', 'Collaboration'], experience: '3+ Years', description: { en: 'Collaborative interface design tool for teams.', vi: 'Thiết kế UI/UX, prototype và cộng tác theo team.' } },
      ],
    },
  ],
  slider: [
    {
      name: 'Web Development',
      icon: '/asset/globe.svg',
      description: {
        en: 'Building modern web applications with cutting-edge technologies',
        vi: 'Xây dựng ứng dụng web hiện đại với công nghệ tiên tiến'
      },
      techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      color: '#38BDF8'
    },
    {
      name: 'Backend Development',
      icon: '/asset/window.svg',
      description: {
        en: 'Creating robust and scalable server-side solutions',
        vi: 'Tạo giải pháp server mạnh mẽ và có khả năng mở rộng'
      },
      techs: ['Node.js', 'Express', 'Python', 'Flask'],
      color: '#22C55E'
    },
    {
      name: 'Database Management',
      icon: '/asset/file.svg',
      description: {
        en: 'Designing and optimizing database structures',
        vi: 'Thiết kế và tối ưu hóa cấu trúc cơ sở dữ liệu'
      },
      techs: ['MongoDB', 'MySQL', 'Redis', 'PostgreSQL'],
      color: '#F59E0B'
    }
  ]
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'Agri-Supplies E-Commerce Platform',
    image: 'https://res.cloudinary.com/drblblupt/image/upload/v1775830078/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2026-04-10_lu%CC%81c_21.06.57_u3iyjm.png',
    description: {
      en: 'Architected a transaction-safe backend for an agricultural e-commerce platform with inventory allocation, payment automation, and real-time order updates.',
      vi: 'Thiết kế backend an toàn giao dịch cho nền tảng thương mại điện tử nông nghiệp với phân bổ tồn kho, tự động hoá thanh toán và cập nhật đơn hàng thời gian thực.',
    },
    tech: ['Java 21', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'JWT', 'WebSocket/STOMP'],
    link: '#',
    github: 'https://github.com/thach45/agri-ecommerce',
    demoVideo: 'https://res.cloudinary.com/drblblupt/video/upload/v1775830091/Ghi_Ma%CC%80n_hi%CC%80nh_2026-04-10_lu%CC%81c_21.07.06_tn8xq0.mov',
    techStack: 'Java 21, Spring Boot, Spring Security, Spring Data JPA, PostgreSQL, JWT, WebSocket/STOMP',
    languages: ['Java'],
    frameworks: ['Spring Boot'],
    status: {
      en: 'Developing',
      vi: 'Đang phát triển',
    },
    startDate: '2024-01-01',
    category: 'backend',
    metrics: {
      commits: 210,
      pullRequests: 38,
      issues: 54,
      timeSpent: 420
    },
    challenges: {
      en: [
        'Designing a checkout flow that remains consistent under concurrent orders',
        'Managing complex order lifecycle transitions and inventory rollback',
        'Securing role-based permissions across many internal APIs'
      ],
      vi: [
        'Thiết kế luồng checkout nhất quán khi có nhiều đơn hàng đồng thời',
        'Quản lý vòng đời đơn hàng phức tạp và hoàn tồn kho chính xác',
        'Bảo mật phân quyền theo vai trò cho nhiều API nội bộ'
      ]
    },
    solutions: {
      en: [
        'Implemented transaction-safe checkout with atomic allocation using FEFO/FIFO',
        'Applied State Pattern for order lifecycle and automated cancel/rollback for expired payments',
        'Built RBAC with endpoint-permission synchronization and JWT-authenticated WebSocket updates'
      ],
      vi: [
        'Triển khai checkout an toàn giao dịch với phân bổ tồn kho FEFO/FIFO theo nguyên tử',
        'Áp dụng State Pattern cho vòng đời đơn hàng và tự động huỷ/hoàn tồn khi quá hạn thanh toán',
        'Xây dựng RBAC đồng bộ quyền theo endpoint và cập nhật thời gian thực bằng WebSocket + JWT'
      ]
    }
  },
  {
    id: '2',
    title: 'E-Learning Platform Backend',
    image: 'https://res.cloudinary.com/drblblupt/image/upload/v1775829786/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2026-04-10_lu%CC%81c_21.02.54_thzlhp.png',
    description: {
      en: 'Built a modular backend for e-learning, covering course management, media processing, secure enrollment, and real-time notifications.',
      vi: 'Xây dựng backend mô-đun cho hệ thống e-learning, bao gồm quản lý khoá học, xử lý media, ghi danh an toàn và thông báo thời gian thực.',
    },
    tech: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'Socket.io', 'JWT', 'Cloudinary'],
    link: 'https://e-learning-hubpro.vercel.app/',
    github: 'https://github.com/thach45/backend-e-learning',
    demoVideo: 'https://res.cloudinary.com/drblblupt/video/upload/v1775828880/Ghi_Ma%CC%80n_hi%CC%80nh_2026-04-10_lu%CC%81c_20.45.40_jna8af.mov',
    techStack: 'NestJS, TypeScript, Prisma, PostgreSQL, Redis, Socket.io, JWT, Cloudinary',
    languages: ['TypeScript'],
    frameworks: ['NestJS'],
    status: {
      en: 'Developing',
      vi: 'Đang phát triển',
    },
    startDate: '2024-03-01',
    category: 'backend',
    metrics: {
      commits: 184,
      pullRequests: 31,
      issues: 47,
      timeSpent: 360
    },
    challenges: {
      en: [
        'Keeping architecture modular while supporting many course and media workflows',
        'Balancing security with good API performance under frequent access',
        'Delivering real-time updates for learning and operational events'
      ],
      vi: [
        'Giữ kiến trúc mô-đun khi phải xử lý nhiều luồng nghiệp vụ khoá học và media',
        'Cân bằng bảo mật và hiệu năng API trong các endpoint truy cập cao',
        'Cung cấp cập nhật thời gian thực cho hoạt động học tập và vận hành'
      ]
    },
    solutions: {
      en: [
        'Designed layered architecture with repository abstraction using NestJS + Prisma',
        'Implemented JWT, Guards, RBAC, and rate limiting (Throttler) for hardened access control',
        'Integrated Redis caching, Cloudinary media pipeline, and Socket.io notifications'
      ],
      vi: [
        'Thiết kế layered architecture với repository abstraction bằng NestJS + Prisma',
        'Triển khai JWT, Guards, RBAC và rate limiting (Throttler) để tăng bảo mật truy cập',
        'Tích hợp Redis cache, pipeline media Cloudinary và thông báo thời gian thực bằng Socket.io'
      ]
    }
  },
  {
    id: '3',
    title: 'BlinkyVocab - Gamified Learning Platform',
    image: 'https://res.cloudinary.com/drblblupt/image/upload/v1775829707/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2026-04-10_lu%CC%81c_21.01.36_vxkrxx.png',
    description: {
      en: 'Engineered a scalable backend ecosystem for gamified language learning with personalized scheduling, achievements, and community interactions.',
      vi: 'Xây dựng hệ sinh thái backend có khả năng mở rộng cho nền tảng học ngôn ngữ gamified với lịch học cá nhân hoá, thành tích và tương tác cộng đồng.',
    },
    tech: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'WebSockets', 'JWT', 'OAuth2'],
    link: 'https://www.blinkyvocab.id.vn/',
    github: 'https://github.com/thach45/learning-english-backend',
    demoVideo: 'https://res.cloudinary.com/drblblupt/video/upload/v1775829674/Ghi_Ma%CC%80n_hi%CC%80nh_2026-04-10_lu%CC%81c_20.59.06_xkc6ra.mov',
    techStack: 'NestJS, TypeScript, Prisma, PostgreSQL, Redis, WebSockets, JWT, OAuth2, AI APIs',
    languages: ['TypeScript'],
    frameworks: ['NestJS'],
    status: {
      en: 'Developing',
      vi: 'Đang phát triển',
    },
    startDate: '2024-06-01',
    category: 'backend',
    metrics: {
      commits: 162,
      pullRequests: 26,
      issues: 41,
      timeSpent: 340
    },
    challenges: {
      en: [
        'Designing an adaptive learning algorithm that personalizes review intervals',
        'Coordinating realtime events across notifications and community features',
        'Maintaining secure multi-role access with third-party authentication'
      ],
      vi: [
        'Thiết kế thuật toán học thích ứng để cá nhân hoá lịch ôn tập',
        'Điều phối sự kiện thời gian thực cho thông báo và tính năng cộng đồng',
        'Duy trì bảo mật đa vai trò với cơ chế xác thực bên thứ ba'
      ]
    },
    solutions: {
      en: [
        'Combined SM-2 spaced repetition and forgetting-curve logic for personalized review scheduling',
        'Built event-driven WebSocket architecture for instant updates and live interactions',
        'Implemented JWT + Google OAuth2 with RBAC and Redis-backed performance optimizations'
      ],
      vi: [
        'Kết hợp thuật toán SM-2 và forgetting curve để tối ưu lịch ôn tập cá nhân',
        'Xây dựng kiến trúc WebSocket hướng sự kiện cho cập nhật tức thời và tương tác trực tiếp',
        'Triển khai JWT + Google OAuth2 với RBAC và tối ưu hiệu năng bằng Redis'
      ]
    }
  }
];

export const personalImprints: Imprint[] = [
  {
    id: 'imprint-06',
    year: '2025',
    title: {
      vi: 'Giải thưởng Hackathon 24h',
      en: 'Hackathon 24h Award',
    },
    org: {
      vi: 'HCMUTE / Khoa CNTT',
      en: 'HCMUTE / IT Faculty',
    },
    memory: {
      vi: 'Đêm hackathon 24h, mình và team đã thành công vượt qua nhiều thử thách. Đó là dấu mốc mình tự hào nhất.',
      en: 'The 24-hour hackathon, we overcame many challenges and succeeded. That’s the milestone I’m proudest of.',
    },
    image: '/asset/hackathon-reward.jpg',
    highlight: true,
  },
];

export const CHAT_SYSTEM_PROMPT = `You are ${personalInfo.name.en} (${personalInfo.name.vi}), a Backend Developer from Vietnam. You are NOT an AI assistant - you ARE ${personalInfo.name.en} himself chatting with visitors on your portfolio website.

About you:
- Name: ${personalInfo.name.en}
- Location: ${personalInfo.address.en}
- Profession: ${personalInfo.title.en}
- Specialties: Node.js, Express, Python, MongoDB, MySQL, PostgreSQL
- Bio: ${personalInfo.bio.en}

Rules:
1. Always respond as Thach in first person ("I", "my", "me")
2. Be professional yet friendly and conversational
3. If asked about work/projects, share your genuine experiences as a backend developer
4. Keep responses concise but helpful
5. Never say you are an AI or language model - you are Thach
6. Use occasional emoji to be friendly 😊`;
