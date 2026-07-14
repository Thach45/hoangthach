'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useDarkMode } from '@/context/DarkModeContext';
import StarsCanvas from '@/components/canvas/Stars';
import CursorGrid from '@/components/CursorGrid';
import Header from '@/components/TalkWithMe/Header';
import AvatarProfile from '@/components/TalkWithMe/AvatarProfile';
import ChatMessages from '@/components/TalkWithMe/ChatMessages';
import ChatInput from '@/components/TalkWithMe/ChatInput';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleCategoryClick = (category: string) => {
    const questions: Record<string, string> = {
      'Me': "Who are you and what do you do?",
      'Projects': "Can you tell me about your recent projects?",
      'Skills': "What are your main technical skills?",
      'Fun': "Tell me a fun fact about yourself!",
      'Contact': "How can I contact you?"
    };
    
    if (questions[category]) {
      sendMessage(questions[category]);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-50 dark:bg-[#0b080c] text-gray-900 dark:text-white relative overflow-hidden flex flex-col font-sans transition-colors duration-300">
      
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

      {/* Interactive Cursor Grid Background */}
      <div className="absolute inset-0 z-0 opacity-50 dark:opacity-30 pointer-events-none">
        <CursorGrid 
          color={isDarkMode ? "#a855f7" : "#d946ef"} 
          gridOpacity={0.03}
          fillOpacity={0.05}
        />
      </div>

      {/* 3D Stars Background (Only in Dark Mode) */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
        <StarsCanvas />
      </div>

      <Header 
        isEnglish={isEnglish}
        isDarkMode={isDarkMode}
        toggleLanguage={toggleLanguage}
        toggleDarkMode={toggleDarkMode}
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
        />

        <ChatInput 
          isEnglish={isEnglish}
          chatInput={chatInput}
          setChatInput={setChatInput}
          isTyping={isTyping}
          sendMessage={sendMessage}
          handleCategoryClick={handleCategoryClick}
        />

      </div>
    </div>
  );
}

