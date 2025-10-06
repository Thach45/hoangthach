import { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    image: '/asset/e-commerce.png',
    description: {
      en: 'Building a complete e-commerce platform with features such as cart, payment and order management.',
      vi: 'Xây dựng nền tảng thương mại điện tử hoàn chỉnh với tính năng giỏ hàng, thanh toán và quản lý đơn hàng.',
    },
    tech: ['ExpressJS', 'Node.js', 'MongoDB'],
    link: 'https://stoneshop.vercel.app/',
    github: 'https://github.com/yourusername/e-commerce',
    demoVideo: '/videos/e-commerce-demo.mp4',
    techStack: 'Node.Js, ExpressJS, Pug, MongoDB',
    languages: ['JavaScript', 'TypeScript'],
    frameworks: ['Express.js', 'Node.js'],
    status: {
      en: 'Developing',
      vi: 'Đang phát triển',
    },
    startDate: '2024-01-01',
    category: 'fullstack',
    metrics: {
      commits: 156,
      pullRequests: 23,
      issues: 45,
      timeSpent: 320
    },
    challenges: {
      en: [
        'Implementing real-time inventory tracking',
        'Handling concurrent transactions',
        'Optimizing database queries for large catalogs'
      ],
      vi: [
        'Triển khai theo dõi hàng tồn kho theo thời gian thực',
        'Xử lý giao dịch đồng thời',
        'Tối ưu hóa truy vấn cơ sở dữ liệu cho danh mục lớn'
      ]
    },
    solutions: {
      en: [
        'Used WebSocket for real-time updates',
        'Implemented transaction isolation levels',
        'Added database indexing and caching'
      ],
      vi: [
        'Sử dụng WebSocket cho cập nhật thời gian thực',
        'Triển khai các mức cô lập giao dịch',
        'Thêm lập chỉ mục và bộ nhớ đệm cơ sở dữ liệu'
      ]
    }
  },
  {
    id: '2',
    title: 'Finance Manager',
    image: '/asset/finace-manager.png',
    description: {
      en: 'Personal finance management application with features, login, register, expense management, borrowing, lending.',
      vi: 'Ứng dụng quản lý tài chính cá nhân với các tính năng, đăng nhập, đăng kí, quản lí chi tiêu, vay, mượn.',
    },
    tech: ['Python', 'Flask', 'Tailwind'],
    link: 'https://finace-manager.onrender.com/',
    github: 'https://github.com/yourusername/finance-manager',
    demoVideo: '/videos/finance-demo.mp4',
    techStack: 'Python, Flask, Tailwind',
    languages: ['Python'],
    frameworks: ['Flask'],
    status: {
      en: 'Developing',
      vi: 'Đang phát triển',
    },
    startDate: '2024-02-15',
    category: 'fullstack',
    metrics: {
      commits: 98,
      pullRequests: 15,
      issues: 28,
      timeSpent: 240
    },
    challenges: {
      en: [
        'Implementing secure authentication',
        'Managing complex financial calculations',
        'Creating intuitive data visualizations'
      ],
      vi: [
        'Triển khai xác thực bảo mật',
        'Quản lý các tính toán tài chính phức tạp',
        'Tạo trực quan hóa dữ liệu trực quan'
      ]
    },
    solutions: {
      en: [
        'Used JWT and secure password hashing',
        'Implemented dedicated calculation service',
        'Integrated interactive charts with D3.js'
      ],
      vi: [
        'Sử dụng JWT và mã hóa mật khẩu an toàn',
        'Triển khai service tính toán chuyên dụng',
        'Tích hợp biểu đồ tương tác với D3.js'
      ]
    }
  },
  {
    id: '3',
    title: 'E-Learning',
    image: '/asset/e-learning.png',
    description: {
      en: 'Online learning system with courses, lectures, quizzes, helping learners and teachers easily manage courses.',
      vi: 'Hệ thống học trực tuyến với các khóa học, bài giảng, bài kiểm tra, giúp người học và dạy dễ dàng quản lí các khóa học.',
    },
    tech: ['NextJs', 'MongoDB', 'Typescript'],
    link: '#',
    github: 'https://github.com/yourusername/e-learning',
    demoVideo: '/videos/elearning-demo.mp4',
    techStack: 'NextJs, Typescript, MongoDB',
    languages: ['TypeScript', 'JavaScript'],
    frameworks: ['Next.js', 'React'],
    status: {
      en: 'Developing',
      vi: 'Đang phát triển',
    },
    startDate: '2024-03-01',
    category: 'frontend',
    metrics: {
      commits: 78,
      pullRequests: 12,
      issues: 34,
      timeSpent: 180
    },
    challenges: {
      en: [
        'Managing complex state across components',
        'Implementing real-time collaboration',
        'Optimizing video streaming performance'
      ],
      vi: [
        'Quản lý state phức tạp giữa các components',
        'Triển khai tính năng cộng tác thời gian thực',
        'Tối ưu hóa hiệu suất phát video'
      ]
    },
    solutions: {
      en: [
        'Used Redux Toolkit for state management',
        'Integrated Socket.io for real-time features',
        'Implemented adaptive video streaming'
      ],
      vi: [
        'Sử dụng Redux Toolkit để quản lý state',
        'Tích hợp Socket.io cho tính năng thời gian thực',
        'Triển khai phát video thích ứng'
      ]
    }
  },
  {
  id: '4',
  title: 'Learning English',
  image: '/asset/e-commerce.png',
  description: {
    en: 'A progressive Node.js framework for building efficient and scalable server-side applications.',
    vi: 'Một framework Node.js tiến bộ để xây dựng các ứng dụng phía máy chủ hiệu quả và có khả năng mở rộng.'
  },
  tech: [
    'NestJS',
    'TypeScript',
    'Prisma',
    'Node.js',
    'ioredis',
    'bcrypt',
    'googleapis'
  ],
  link: '',
  github: 'https://github.com/thach45/learning-english-backend',
  demoVideo: '/videos/e-commerce-demo.mp4',
  techStack: 'NestJS, TypeScript, Prisma, Node.js, ioredis, bcrypt, googleapis',
  languages: [
    'JavaScript',
    'TypeScript'
  ],
  frameworks: [
    'NestJS',
    'Node.js'
  ],
  status: {
    en: 'Developing',
    vi: 'Đang phát triển'
  },
  startDate: '',
  category: 'fullstack',
  metrics: {
    commits: 13,
    pullRequests: 0,
    issues: 0,
    timeSpent: 0
  },
  challenges: {
    en: [
      'Implementing a secure user authentication and authorization system using JSON Web Tokens (JWT).',
      'Managing database interactions efficiently with an Object-Relational Mapper (ORM).',
      'Improving application performance and scalability through caching.',
      'Integrating with third-party services like Google APIs for data translation and processing.',
      'Ensuring code quality and stability through comprehensive testing.'
    ],
    vi: [
      'Triển khai hệ thống xác thực và phân quyền người dùng an toàn bằng cách sử dụng JSON Web Tokens (JWT).',
      'Quản lý hiệu quả các tương tác cơ sở dữ liệu với một Object-Relational Mapper (ORM).',
      'Cải thiện hiệu suất và khả năng mở rộng của ứng dụng thông qua bộ nhớ đệm.',
      'Tích hợp với các dịch vụ bên thứ ba như Google API để dịch và xử lý dữ liệu.',
      'Đảm bảo chất lượng và sự ổn định của mã thông qua kiểm thử toàn diện.'
    ]
  },
  solutions: {
    en: [
      'Used `bcrypt` for secure password hashing and `@nestjs/jwt` for token-based authentication.',
      'Implemented `Prisma` as the ORM for database operations.',
      'Utilized `ioredis` for caching to reduce database load and improve response times.',
      'Used `googleapis` and `google-translate-api-x` to handle interactions with Google\'s services.',
      'Set up a testing environment with `Jest` for unit tests and `jest-e2e` for end-to-end tests to maintain stability.'
    ],
    vi: [
      'Sử dụng `bcrypt` để băm mật khẩu an toàn và `@nestjs/jwt` cho xác thực dựa trên mã thông báo.',
      'Triển khai `Prisma` làm ORM cho các hoạt động cơ sở dữ liệu.',
      'Sử dụng `ioredis` để bộ nhớ đệm nhằm giảm tải cơ sở dữ liệu và cải thiện thời gian phản hồi.',
      'Sử dụng `googleapis` và `google-translate-api-x` để xử lý các tương tác với dịch vụ của Google.',
      'Thiết lập môi trường kiểm thử với `Jest` cho kiểm thử đơn vị và `jest-e2e` cho kiểm thử đầu cuối để duy trì sự ổn định.'
    ]
  }
}
  
   
];