'use client';

import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { VisitorMessage } from '@/lib/chat';

const noteColors = ['#f8e8a8', '#f7d9df', '#dcecc6', '#d7e7f7', '#eadcf6'];

function notePosition(id: string, index: number) {
  let hash = 0;
  for (let character = 0; character < id.length; character += 1) {
    hash = (hash * 31 + id.charCodeAt(character)) | 0;
  }
  const positive = Math.abs(hash);
  return {
    left: 4 + (positive % 90),
    top: 10 + ((positive >>> 4) % 78),
    rotate: ((positive >>> 9) % 15) - 7,
    color: noteColors[(positive + index) % noteColors.length],
  };
}

interface MessagesWallBackgroundProps {
  messages: VisitorMessage[];
  onClose: () => void;
}

export default function MessagesWallBackground({ messages, onClose }: MessagesWallBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#49392f]">
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(254,231,178,0.22),transparent_42%),linear-gradient(135deg,rgba(20,12,9,0.15),rgba(73,57,47,0.75))]" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {messages.slice(0, 60).map((message, index) => {
          const position = notePosition(message.id, index);
          return (
            <motion.article
              key={message.id}
              initial={{ opacity: 0, scale: 0.7, rotate: position.rotate - 4 }}
              animate={{ opacity: 0.86, scale: 1, rotate: position.rotate, y: [0, -5, 0] }}
              transition={{
                opacity: { delay: Math.min(index * 0.03, 0.8) },
                y: { duration: 4 + (index % 3), repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{ left: `${position.left}%`, top: `${position.top}%`, backgroundColor: position.color }}
              className="absolute w-32 -translate-x-1/2 -translate-y-1/2 p-3 shadow-[0_14px_22px_rgba(0,0,0,0.28)] sm:w-44 sm:p-4"
            >
              <p className="line-clamp-4 font-serif text-xs leading-relaxed text-stone-700 sm:text-sm">{message.content}</p>
              <p className="mt-2 truncate text-[10px] font-semibold text-stone-500">- {message.author || 'Một người ghé qua'}</p>
            </motion.article>
          );
        })}
      </div>
      <button type="button" onClick={onClose} className="absolute right-4 top-4 z-40 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/45" aria-label="Return to the regular chat background">
        <X size={15} /> Trở về chat thường
      </button>
    </div>
  );
}
