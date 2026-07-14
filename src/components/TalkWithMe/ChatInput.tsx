'use client';

interface ChatInputProps {
  isEnglish: boolean;
  chatInput: string;
  setChatInput: (val: string) => void;
  isTyping: boolean;
  sendMessage: (text?: string) => void;
  handleCategoryClick: (category: string) => void;
}

export default function ChatInput({ 
  isEnglish, 
  chatInput, 
  setChatInput, 
  isTyping, 
  sendMessage, 
  handleCategoryClick 
}: ChatInputProps) {
  return (
    <div className="w-full max-w-2xl px-4 flex flex-col items-center shrink-0 mt-2 relative">
      
      {/* Fade gradient behind the input area so text doesn't clash */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/90 dark:from-[#0b080c] dark:via-[#0b080c]/90 to-transparent -z-10 pointer-events-none scale-110 translate-y-4"></div>

      {/* Horizontal Scrollable Category Pills */}
      <div className="w-full overflow-x-auto hide-scrollbar mb-4 mask-edges pb-1">
        <div className="flex items-center gap-2 w-max px-4 mx-auto">
          {[
            { id: 'Me', icon: '👤', label: isEnglish ? 'Me' : 'Về mình' },
            { id: 'Projects', icon: '💼', label: isEnglish ? 'Projects' : 'Dự án' },
            { id: 'Skills', icon: '⚡', label: isEnglish ? 'Skills' : 'Kỹ năng' },
            { id: 'Fun', icon: '🎉', label: isEnglish ? 'Fun' : 'Giải trí' },
            { id: 'Contact', icon: '📩', label: isEnglish ? 'Contact' : 'Liên hệ' }
          ].map((cat) => (
            <button 
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              disabled={isTyping}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] border border-gray-200/60 dark:border-white/5 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 transition-all shadow-sm active:scale-95 disabled:opacity-50 whitespace-nowrap"
            >
              <span className="text-[13px]">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Refined Minimalist Input Bar */}
      <div className="w-full relative transition-all duration-300 mb-2 group">
        <div className="relative flex items-center bg-white dark:bg-[#212121] border border-gray-200 dark:border-white/10 rounded-[28px] p-1.5 shadow-sm focus-within:shadow-md focus-within:border-gray-300 dark:focus-within:border-white/20 transition-all">
          
          <input 
            type="text" 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={isEnglish ? "Message Thach..." : "Nhắn cho Thạch..."}
            className="flex-1 bg-transparent py-2.5 px-5 outline-none focus:outline-none focus:ring-0 border-none focus:border-none text-gray-900 dark:text-white placeholder-gray-400 text-[15px]"
            disabled={isTyping}
            maxLength={1000}
          />

          <button 
            onClick={() => sendMessage()}
            disabled={!chatInput.trim() || isTyping}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 mr-1 ${
              !chatInput.trim() || isTyping 
                ? 'bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-600 cursor-not-allowed' 
                : 'bg-black text-white dark:bg-white dark:text-black hover:scale-105 active:scale-95 shadow-sm'
            }`}
          >
            <svg className="w-4 h-4 translate-y-[-1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19V5m0 0l-7 7m7-7l7 7"/></svg>
          </button>

        </div>
      </div>

    </div>
  );
}
