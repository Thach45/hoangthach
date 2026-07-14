import React from 'react';

interface ShortcutWidgetsProps {
  isEnglish: boolean;
  onShortcutClick: (category: string) => void;
  isTyping: boolean;
}

export default function ShortcutWidgets({ isEnglish, onShortcutClick, isTyping }: ShortcutWidgetsProps) {
  const shortcuts = [
    { id: 'Me', icon: '👤', label: isEnglish ? 'About' : 'Về mình', color: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/20' },
    { id: 'Projects', icon: '💼', label: isEnglish ? 'Projects' : 'Dự án', color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/20' },
    { id: 'Skills', icon: '⚡', label: isEnglish ? 'Skills' : 'Kỹ năng', color: 'from-yellow-500/20 to-yellow-500/5', border: 'border-yellow-500/20' },
    { id: 'Fun', icon: '🎉', label: isEnglish ? 'Fun Fact' : 'Giải trí', color: 'from-pink-500/20 to-pink-500/5', border: 'border-pink-500/20' },
    { id: 'Contact', icon: '📩', label: isEnglish ? 'Contact' : 'Liên hệ', color: 'from-green-500/20 to-green-500/5', border: 'border-green-500/20' }
  ];

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-6 hidden lg:flex flex-col gap-3 pointer-events-auto z-20">
      {shortcuts.map((cat, idx) => (
        <button 
          key={cat.id}
          onClick={() => onShortcutClick(cat.id)}
          disabled={isTyping}
          className={`flex items-center gap-3 px-5 py-3.5 bg-white/50 dark:bg-[#1e1e1e]/80 backdrop-blur-md border ${cat.border} rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 transition-all hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed group shadow-sm`}
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center text-lg group-hover:scale-110 transition-transform`}>
            {cat.icon}
          </div>
          <span className="tracking-wide">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
