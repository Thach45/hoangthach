'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { CHAT_SYSTEM_PROMPT } from '@/data/data';
import { useLanguage } from '@/context/LanguageContext';

import StarsCanvas from '@/components/canvas/Stars';

const Scene = dynamic(() => import('../../components/TalkWithMe/Scene'), { ssr: false });

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface FloatingMessage {
  id: string;
  content: string;
  x: number;
  y: number;
  scale: number;
}

export default function TalkWithMe() {
  const { isEnglish } = useLanguage();
  const [floatingMessages, setFloatingMessages] = useState<FloatingMessage[]>([
    {
      id: 'initial-1',
      content: isEnglish ? "Hello! I'm Thach. Feel free to ask me anything! 👋" : "Chào bạn! Mình là Thạch. Bạn cứ tự nhiên đặt câu hỏi nhé! 👋",
      x: -400,
      y: -150,
      scale: 1
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);

  const sendMessage = async () => {
    if (!chatInput.trim() || isTyping) return;

    const userMessage: ChatMessage = { role: 'user', content: chatInput };
    setHistory(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    try {
      const messages = [
        { role: 'system', content: CHAT_SYSTEM_PROMPT },
        ...history,
        userMessage
      ];

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
        
        // Check for mobile screen
        const isMobile = window.innerWidth < 768;

        // Add to floating messages
        const newMessage: FloatingMessage = {
          id: Math.random().toString(36).substr(2, 9),
          content,
          x: isMobile ? (Math.random() * 40 - 20) : (150 + Math.random() * 150),
          y: isMobile ? (-100 - Math.random() * 50) : (-150 - Math.random() * 100),
          scale: isMobile ? (0.9 + Math.random() * 0.1) : (0.8 + Math.random() * 0.4)
        };
        
        setFloatingMessages(prev => [...prev, newMessage]);

        // Auto remove message after 7 seconds
        setTimeout(() => {
          setFloatingMessages(prev => prev.filter(m => m.id !== newMessage.id));
        }, 7000);

      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b080c] text-white overflow-hidden relative">
      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white/60 hover:text-white transition-colors bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        <span className="text-sm font-bold uppercase ">{isEnglish ? 'Back' : 'Quay lại'}</span>
      </Link>

      {/* 3D Background - Stars & Character */}
      <div className="absolute inset-0 z-0">
        <StarsCanvas />
        <Scene />
      </div>

      {/* Floating Messages Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-start sm:justify-center pt-24 sm:pt-0 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence>
            {floatingMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  scale: msg.scale, 
                  y: msg.y,
                  x: msg.x,
                  transition: { type: 'spring', damping: 15 }
                }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
                className="absolute pointer-events-auto"
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: '-130px', // Half of mobile width
                  marginTop: '-100px'  // Move up to be above character's head on mobile
                }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="w-[260px] sm:w-[300px] p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-black/30 sm:bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl"
                >
                  <p className="text-[13px] sm:text-sm leading-relaxed text-white/95">
                    {msg.content}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Typing Indicator Overlay - Responsive */}
      {isTyping && (
        <div className="absolute top-20 sm:top-24 right-4 sm:right-10 pointer-events-none z-50">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-2 bg-brand/20 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-brand/30"
          >
            <span className="text-[9px] sm:text-[10px] font-bold uppercase  text-brand">Thinking</span>
            <div className="flex gap-1 items-center">
              <span className="w-1 h-1 bg-brand rounded-full animate-bounce"></span>
              <span className="w-1 h-1 bg-brand rounded-full animate-bounce delay-100"></span>
              <span className="w-1 h-1 bg-brand rounded-full animate-bounce delay-200"></span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Bottom Input Area - Optimized for Mobile Keyboard */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 w-full px-4 sm:px-0 z-50">
        <div className="max-w-[600px] mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-1.5 sm:p-2">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={isEnglish ? "Type here..." : "Nhập tại đây..."}
              className="flex-1 bg-transparent px-4 sm:px-6 py-2.5 sm:py-3 outline-none text-white text-sm sm:text-base"
            />
            <button 
              onClick={sendMessage}
              disabled={!chatInput.trim() || isTyping}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-brand rounded-xl flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50 disabled:grayscale"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9-2-9-18-9 18 9 2zm0 0v-8"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Ambient Text - Hidden on very small screens */}
      <div className="absolute top-10 right-10 text-right pointer-events-none opacity-10 hidden md:block">
        <h2 className="text-6xl font-black uppercase leading-none">Creative<br/>Interaction</h2>
      </div>
    </div>
  );
}
