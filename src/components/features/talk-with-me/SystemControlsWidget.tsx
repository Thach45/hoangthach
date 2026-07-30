interface SystemControlsWidgetProps {
  isEnglish: boolean;
  isDarkMode: boolean;
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
  compact?: boolean;
}

export default function SystemControlsWidget({ isEnglish, isDarkMode, toggleLanguage, toggleDarkMode, compact = false }: SystemControlsWidgetProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <button 
          onClick={(e) => { e.stopPropagation(); toggleDarkMode(); }}
          className="text-white/60 hover:text-white transition-colors"
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
        <div className="w-[1px] h-3 bg-white/20"></div>
        <button 
          onClick={(e) => { e.stopPropagation(); toggleLanguage(); }} 
          className="text-[10px] font-bold text-white/60 hover:text-white transition-colors"
        >
          {isEnglish ? 'EN' : 'VN'}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6 shrink-0">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34C759]"></span>
        </span>
        <span className="text-[10px] font-bold text-white/80 tracking-wider whitespace-nowrap">
          {isEnglish ? 'AI READY' : 'AI SẴN SÀNG'}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={(e) => { e.stopPropagation(); toggleDarkMode(); }}
          className="text-white/60 hover:text-white transition-colors"
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
        <div className="w-[1px] h-3 bg-white/20"></div>
        <button 
          onClick={(e) => { e.stopPropagation(); toggleLanguage(); }} 
          className="text-[11px] font-bold text-white/60 hover:text-white transition-colors"
        >
          {isEnglish ? 'EN' : 'VN'}
        </button>
      </div>
    </div>
  );
}
