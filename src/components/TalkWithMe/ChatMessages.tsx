'use client';

import { motion, AnimatePresence } from 'framer-motion';

import { WidgetProjects, WidgetSkills, WidgetContact, WidgetAbout } from './ChatWidgets';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatMessagesProps {
  isEnglish: boolean;
  history: ChatMessage[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatMessages({ isEnglish, history, isTyping, messagesEndRef }: ChatMessagesProps) {
  
  // Helper to safely parse AI response
  const parseResponse = (content: string) => {
    try {
      const parsed = JSON.parse(content);
      if (parsed.text && parsed.widget) {
        return parsed;
      }
    } catch (e) {
      // Not JSON or invalid schema, return fallback
    }
    return { text: content, widget: 'none' };
  };

  return (
    <div className="flex-1 w-full max-w-2xl overflow-y-auto custom-scrollbar mask-vertical px-4 py-6 flex flex-col gap-4">
      <AnimatePresence>
        {history.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex items-center justify-center h-full text-gray-400 dark:text-white/30 text-sm"
          >
            {isEnglish ? "No messages yet. Send a message to start!" : "Chưa có tin nhắn nào. Hãy bắt đầu hỏi ngay!"}
          </motion.div>
        )}

        {history.map((msg, idx) => {
          const isUser = msg.role === 'user';
          const { text, widget } = isUser ? { text: msg.content, widget: 'none' } : parseResponse(msg.content);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex flex-col gap-2 max-w-[85%]">
                {/* Chat Bubble */}
                <div className={`px-5 py-3.5 rounded-2xl ${
                  isUser 
                    ? 'bg-brand text-white rounded-br-sm shadow-[0_4px_15px_rgba(var(--brand-color),0.2)] ml-auto' 
                    : 'bg-white dark:bg-white/10 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-lg text-gray-800 dark:text-gray-100 rounded-bl-sm mr-auto'
                }`}>
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{text}</p>
                </div>
                
                {/* Dynamic Widget */}
                {!isUser && widget === 'projects' && <WidgetProjects isEnglish={isEnglish} />}
                {!isUser && widget === 'skills' && <WidgetSkills isEnglish={isEnglish} />}
                {!isUser && widget === 'contact' && <WidgetContact isEnglish={isEnglish} />}
                {!isUser && widget === 'about' && <WidgetAbout isEnglish={isEnglish} />}
              </div>
            </motion.div>
          );
        })}
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full justify-start"
          >
            <div className="bg-white dark:bg-white/10 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-lg rounded-2xl rounded-bl-sm px-5 py-4 flex gap-1 items-center">
              <span className="w-2 h-2 bg-brand rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-brand rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-brand rounded-full animate-bounce delay-200"></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Scroll anchor */}
      <div ref={messagesEndRef} className="h-1" />
    </div>
  );
}
