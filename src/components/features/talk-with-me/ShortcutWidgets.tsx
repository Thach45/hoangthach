import React from 'react';

interface ShortcutWidgetsProps {
  isEnglish: boolean;
  onShortcutClick: (category: string) => void;
  isTyping: boolean;
}

export default function ShortcutWidgets({ isEnglish, onShortcutClick, isTyping }: ShortcutWidgetsProps) {
  const shortcuts = [
    { id: 'CV', icon: '📄', label: isEnglish ? 'CV' : 'CV', color: 'from-red-500/20 to-red-500/5', border: 'border-red-500/20' },
    { id: 'Projects', icon: '💼', label: isEnglish ? 'Projects' : 'Dự án', color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/20' },
    { id: 'Skills', icon: '⚡', label: isEnglish ? 'Skills' : 'Kỹ năng', color: 'from-yellow-500/20 to-yellow-500/5', border: 'border-yellow-500/20' },
    { id: 'Experience', icon: '🎓', label: isEnglish ? 'Journey' : 'Hành trình', color: 'from-cyan-500/20 to-cyan-500/5', border: 'border-cyan-500/20' },
    { id: 'Messages', icon: '📝', label: isEnglish ? 'Notes' : 'Lời nhắn', color: 'from-amber-500/20 to-amber-500/5', border: 'border-amber-500/20' },
    { id: 'Fun', icon: '🎉', label: isEnglish ? 'Fun Fact' : 'Giải trí', color: 'from-pink-500/20 to-pink-500/5', border: 'border-pink-500/20' },
    { id: 'Contact', icon: '📩', label: isEnglish ? 'Contact' : 'Liên hệ', color: 'from-green-500/20 to-green-500/5', border: 'border-green-500/20' }
  ];

  return (
    <div className="w-full max-w-2xl shrink-0 overflow-x-auto px-4 pb-1 pt-1 custom-scrollbar">
      <div className="flex w-max items-center gap-3">
      {shortcuts.map((cat, idx) => (
        <button 
          key={cat.id}
          onClick={() => onShortcutClick(cat.id)}
          disabled={isTyping}
          className={`flex shrink-0 items-center gap-3 rounded-2xl border ${cat.border} bg-white/50 px-5 py-3.5 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 dark:bg-[#1e1e1e]/80 dark:text-gray-200 group`}
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${cat.color} text-lg transition-transform group-hover:scale-110`}>
            {cat.icon}
          </div>
          <span className="tracking-wide">{cat.label}</span>
        </button>
      ))}
      </div>
    </div>
  );
}
