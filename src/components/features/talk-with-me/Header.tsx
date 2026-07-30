'use client';

import DynamicIsland from '@/components/ui/DynamicIsland';
import MusicPlayerWidget from './MusicPlayerWidget';
import SystemControlsWidget from './SystemControlsWidget';
import IslandStatus from './IslandStatus';

interface HeaderProps {
  isEnglish: boolean;
  isDarkMode: boolean;
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
  nowPlaying?: {
    title: string;
    artist: string;
    artwork: string;
    url: string;
  };
  onSongEnd?: () => void;
}

export default function Header({ isEnglish, isDarkMode, toggleLanguage, toggleDarkMode, nowPlaying, onSongEnd }: HeaderProps) {
  const expandedContent = nowPlaying ? (
    <div className="flex items-center justify-between w-full h-full gap-6">
      <MusicPlayerWidget nowPlaying={nowPlaying} onSongEnd={onSongEnd} />

      <div className="w-[1px] h-8 bg-white/10 shrink-0"></div>

      <SystemControlsWidget 
        isEnglish={isEnglish} 
        isDarkMode={isDarkMode} 
        toggleLanguage={toggleLanguage} 
        toggleDarkMode={toggleDarkMode} 
      />
    </div>
  ) : (
    <div className="flex h-full w-full items-center gap-4">
      <IslandStatus expanded />
      <div className="h-8 w-px shrink-0 bg-white/10" />
      <SystemControlsWidget 
        isEnglish={isEnglish} 
        isDarkMode={isDarkMode} 
        toggleLanguage={toggleLanguage} 
        toggleDarkMode={toggleDarkMode} 
      />
    </div>
  );

  return (
    <header className="relative z-50 w-full flex justify-center pt-4 sm:pt-6 pb-2 shrink-0">
      <DynamicIsland 
        isExpanded={!!nowPlaying}
        compactLeft={<IslandStatus />}
        compactRight={null}
        expandedContent={expandedContent}
      />
    </header>
  );
}
