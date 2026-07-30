'use client';

import { useCallback, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useDarkMode } from '@/context/DarkModeContext';
import StarsCanvas from '@/components/visuals/canvas/Stars';
import CursorGrid from '@/components/ui/CursorGrid';
import Header from '@/components/features/talk-with-me/Header';
import AvatarProfile from '@/components/features/talk-with-me/AvatarProfile';
import ChatMessages from '@/components/features/talk-with-me/ChatMessages';
import ShortcutWidgets from '@/components/features/talk-with-me/ShortcutWidgets';
import ChatInput from '@/components/features/talk-with-me/ChatInput';
import MouseEffects from '@/components/ui/MouseEffects';
import MessagesWallBackground from '@/components/features/talk-with-me/MessagesWallBackground';
import type { MusicTrack, VisitorMessage } from '@/lib/chat';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function TalkWithMe() {
  const { isEnglish, toggleLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [nowPlaying, setNowPlaying] = useState<MusicTrack | null>(null);
  const [isVisitorWallActive, setIsVisitorWallActive] = useState(false);
  const [visitorMessages, setVisitorMessages] = useState<VisitorMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleVisitorWallChange = useCallback((active: boolean, messages?: VisitorMessage[]) => {
    setIsVisitorWallActive(active);
    if (messages) setVisitorMessages(messages);
  }, []);

  const sendMessage = async (text: string = chatInput) => {
    if (!text.trim() || isTyping) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    setHistory(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    try {
      // Use sliding window to keep only the last 8 messages (saving tokens & context limit)
      const messages = [
        ...history,
        userMessage
      ].slice(-8);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });

      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        const content = data.choices[0].message.content;
        
        const assistantMessage: ChatMessage = { role: 'assistant', content };
        setHistory(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setHistory(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleShortcutClick = (category: string) => {
    // These shortcut responses are handled purely offline without sending an API request (saves quota)
    const shortcuts: Record<string, { q: string, a: string }> = {
      'Me': { 
        q: isEnglish ? "Who are you?" : "Bạn là ai?", 
        a: JSON.stringify({ text: isEnglish ? "I'm Thạch, a Backend Developer. Here is some info about me!" : "Mình là Thạch, một Backend Developer đam mê công nghệ. Dưới đây là một số thông tin cơ bản về mình!", widget: "about" }) 
      },
      'CV': {
        q: isEnglish ? 'Show me your CV.' : 'Cho mình xem CV.',
        a: JSON.stringify({ text: isEnglish ? 'Here are the two versions of my resume.' : 'Đây là hai phiên bản CV của mình nhé.', widget: 'cv' })
      },
      'Projects': { 
        q: isEnglish ? "Show me your projects." : "Cho xem các dự án của bạn.", 
        a: JSON.stringify({ text: isEnglish ? "Here are my featured projects. You can check the source code or view live demos!" : "Đây là các dự án nổi bật mình đã thực hiện. Bạn có thể xem mã nguồn hoặc demo trực tiếp!", widget: "projects" }) 
      },
      'Skills': { 
        q: isEnglish ? "What are your skills?" : "Bạn biết dùng những công nghệ gì?", 
        a: JSON.stringify({ text: isEnglish ? "I specialize in Backend, but also have knowledge in Frontend and DevOps. See details below:" : "Mình chuyên về Backend, nhưng cũng có kiến thức về Frontend và các công cụ DevOps. Chi tiết dưới đây:", widget: "skills" }) 
      },
      'Fun': { 
        q: isEnglish ? "Tell me a fun fact." : "Kể chuyện vui đi.", 
        a: JSON.stringify({ text: isEnglish ? "Here is a tiny dev confession. 💀" : "Một dev confession nho nhỏ đây. 💀", widget: "funFact" }) 
      },
      'Experience': {
        q: isEnglish ? 'Show me your learning journey.' : 'Cho mình xem hành trình học tập của bạn.',
        a: JSON.stringify({ text: isEnglish ? 'This is the route from foundations to shipping AI products.' : 'Đây là hành trình từ nền tảng đến lúc build sản phẩm AI.', widget: 'experience' })
      },
      'Messages': {
        q: isEnglish ? 'Show me the visitor message wall.' : 'Cho mình xem bức tường lời nhắn nhủ.',
        a: JSON.stringify({ text: isEnglish ? 'Here are the kind notes visitors have left behind.' : 'Đây là những lời nhắn tử tế mọi người đã để lại.', widget: 'visitorMessages' })
      },
      'Contact': { 
        q: isEnglish ? "How can I contact you?" : "Làm sao để liên hệ với bạn?", 
        a: JSON.stringify({ text: isEnglish ? "I'd love to connect! You can reach me via the channels below." : "Rất vui được kết nối với bạn! Hãy liên hệ với mình qua các kênh dưới đây nhé. Hoặc bạn để lại Tên, Email, SDT, và nội dung. Mình sẽ liên hệ lại với bạn sớm nhất.", widget: "contact" }) 
      }
    };
    
    if (shortcuts[category]) {
      const { q, a } = shortcuts[category];
      // Instantly inject user message and static AI response to history
      setHistory(prev => [
        ...prev, 
        { role: 'user', content: q },
        { role: 'assistant', content: a }
      ]);
    }
  };

  return (
    <div className={`h-screen w-full text-gray-900 dark:text-white relative overflow-hidden flex flex-col font-sans transition-colors duration-300 ${isVisitorWallActive ? 'bg-[#49392f]' : 'bg-gray-50 dark:bg-[#0b080c]'}`}>
      <MouseEffects />
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .mask-vertical {
          mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        }
      `}</style>

      {isVisitorWallActive ? (
        <MessagesWallBackground messages={visitorMessages} onClose={() => setIsVisitorWallActive(false)} />
      ) : (
        <>
          <div className="absolute inset-0 z-0 opacity-50 dark:opacity-30 pointer-events-none">
            <CursorGrid 
              color={isDarkMode ? "#a855f7" : "#d946ef"} 
              gridOpacity={0.03}
              fillOpacity={0.05}
            />
          </div>
          <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
            <StarsCanvas />
          </div>
        </>
      )}

      <Header 
        isEnglish={isEnglish}
        isDarkMode={isDarkMode}
        toggleLanguage={toggleLanguage}
        toggleDarkMode={toggleDarkMode}
        nowPlaying={nowPlaying || undefined}
        onSongEnd={() => setNowPlaying(null)}
      />

      {/* Background Giant Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-5">
        <h1 className="text-[15vw] font-black uppercase whitespace-nowrap tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-400 dark:from-white to-transparent">
          THACH HOANG
        </h1>
      </div>

      {/* Main UI Container - Fixed Layout */}
      <div className="flex-1 flex flex-col w-full relative z-10 overflow-hidden items-center pt-6 pb-4">
        
        <AvatarProfile 
          isEnglish={isEnglish} 
          hasHistory={history.length > 0} 
        />

        <ChatMessages 
          isEnglish={isEnglish}
          history={history}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          onSendMessage={sendMessage}
          onSelectMusic={(track) => setNowPlaying(track)}
          onVisitorWallChange={handleVisitorWallChange}
        />

        <ChatInput 
          isEnglish={isEnglish}
          chatInput={chatInput}
          setChatInput={setChatInput}
          isTyping={isTyping}
          sendMessage={sendMessage}
        />

        <ShortcutWidgets 
          isEnglish={isEnglish}
          onShortcutClick={handleShortcutClick}
          isTyping={isTyping}
        />

      </div>
    </div>
  );
}
