'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollSectionProps {
  children: ReactNode;
  delay?: number;
}

export default function ScrollSection({ children, delay = 0 }: ScrollSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
