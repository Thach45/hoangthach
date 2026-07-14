'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface AvatarProfileProps {
  isEnglish: boolean;
  hasHistory: boolean;
}

export default function AvatarProfile({ isEnglish, hasHistory }: AvatarProfileProps) {
  return (
    <motion.div 
      animate={{ scale: hasHistory ? 0.8 : 1, opacity: hasHistory ? 0.5 : 1, y: hasHistory ? -10 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex flex-col items-center text-center w-full max-w-2xl shrink-0"
    >
      {/* Enhanced Avatar with Floating Animation */}
      <div className="relative mb-4">
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-gray-200 dark:border-white/20 shadow-[0_0_30px_rgba(var(--brand-color),0.15)] bg-gradient-to-b from-gray-200 dark:from-white/10 to-transparent relative backdrop-blur-md"
        >
          <Image 
            src="/asset/anh3.png" 
            alt="Thach Avatar" 
            width={200} 
            height={200} 
            className="absolute top-0 left-0 w-full h-full object-cover object-top scale-[1.2] translate-y-2" 
            priority
          />
        </motion.div>
        {/* Decorative orbit rings */}
        <div className="absolute inset-[-10px] rounded-full border border-gray-200 dark:border-white/5 pointer-events-none"></div>
        <div className="absolute inset-[-20px] rounded-full border border-gray-200 dark:border-white/5 pointer-events-none"></div>
      </div>

      <p className="text-lg md:text-xl font-medium text-gray-700 dark:text-white/80 mb-1">
        {isEnglish ? "Hey, I'm Thach 👋" : "Chào, mình là Thạch 👋"}
      </p>
      <p className="text-sm text-gray-500 dark:text-white/50 mb-2 max-w-md mx-auto px-4">
        {isEnglish ? "Ask me anything! Don't want to scroll? I'll summarize my projects, skills, or give you my contact info instantly." : "Lười đọc dài? Cứ hỏi trực tiếp mình ở đây, từ kinh nghiệm, dự án đến thông tin liên lạc!"}
      </p>
    </motion.div>
  );
}
