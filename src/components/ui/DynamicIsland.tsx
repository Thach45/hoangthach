'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DynamicIslandProps {
  isExpanded: boolean;
  compactLeft: React.ReactNode;
  compactRight: React.ReactNode;
  expandedContent: React.ReactNode;
}

export default function DynamicIsland({ isExpanded, compactLeft, compactRight, expandedContent }: DynamicIslandProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isOpen = isExpanded || isHovered;

  return (
    <motion.div 
      layout
      initial={{ y: -50, scale: 0.8, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
      style={{ borderRadius: 32 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      className="bg-[#000000] shadow-[0_8px_32px_rgba(0,0,0,0.3)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.05)] border border-white/10 cursor-pointer overflow-hidden origin-top flex items-center justify-center relative outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <motion.div 
        layout 
        className={`flex justify-between items-center relative w-full ${
          isOpen 
            ? 'px-4 sm:px-6 py-2 w-[min(92vw,600px)] min-h-[64px] h-[64px]' 
            : 'px-3 py-1 w-[158px] min-h-[36px] h-[36px]'
        }`}
      >
        <AnimatePresence mode="popLayout">
          {!isOpen ? (
            <motion.div
              key="compact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
              className="flex items-center justify-between w-full h-full"
            >
              <div className="flex items-center">{compactLeft}</div>
              <div className="flex items-center">{compactRight}</div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              {expandedContent}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
