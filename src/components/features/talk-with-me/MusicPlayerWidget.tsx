import { useRef, useState } from 'react';

interface MusicPlayerWidgetProps {
  nowPlaying?: {
    title: string;
    artist: string;
    artwork: string;
    url: string;
  };
  onSongEnd?: () => void;
}

export default function MusicPlayerWidget({ nowPlaying, onSongEnd }: MusicPlayerWidgetProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleTimeUpdate = () => {
    if (audioRef.current && progressRef.current) {
      const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      if (!isNaN(percent)) {
        progressRef.current.style.width = `${percent}%`;
      }
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(console.error);
    }
  };

  if (!nowPlaying) return null;

  return (
    <>
      {/* key forces React to remount the audio element on each new track, autoPlay lets browser handle it */}
      <audio 
        key={nowPlaying.url}
        ref={audioRef} 
        src={nowPlaying.url}
        autoPlay
        onPlay={() => setIsPlaying(true)} 
        onPause={() => setIsPlaying(false)}
        onEnded={() => { setIsPlaying(false); onSongEnd?.(); }}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg shadow-inner overflow-hidden relative">
          {nowPlaying.artwork ? (
             <img src={nowPlaying.artwork} alt="Album Art" className="w-full h-full object-cover" />
          ) : (
            '🎵'
          )}
        </div>
        <div className="flex flex-col justify-center min-w-[120px]">
          <span className="text-white font-bold text-[13px] leading-tight tracking-wide line-clamp-1">
            {nowPlaying.title}
          </span>
          <div className="w-full flex items-center gap-2 mt-1">
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden relative">
              <div ref={progressRef} className="absolute left-0 top-0 h-full bg-white rounded-full w-0 transition-all duration-75"></div>
            </div>
          </div>
        </div>
        <button 
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shrink-0"
        >
          {isPlaying ? (
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          ) : (
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1"></div>
          )}
        </button>
      </div>
    </>
  );
}
