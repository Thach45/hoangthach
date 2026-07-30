'use client';

import { DarkModeProvider } from '@/context/DarkModeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        {children}
        <Toaster position="bottom-right" />
      </LanguageProvider>
    </DarkModeProvider>
  );
}