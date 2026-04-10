import { Project } from '../types/project';

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