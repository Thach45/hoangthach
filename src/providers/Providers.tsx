'use client';

import { DarkModeProvider } from '@/context/DarkModeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </DarkModeProvider>
  );
}