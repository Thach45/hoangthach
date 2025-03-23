'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  isEnglish: boolean;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [isEnglish, setIsEnglish] = useState(false);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
    // Toggle visibility of language-specific elements
    document.querySelectorAll('.vn').forEach(el => el.classList.toggle('hidden'));
    document.querySelectorAll('.en').forEach(el => el.classList.toggle('hidden'));
  };

  return (
    <LanguageContext.Provider value={{ isEnglish, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}