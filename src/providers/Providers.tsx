'use client';

import { DarkModeProvider } from '@/context/DarkModeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <DarkModeProvider>
        <LanguageProvider>
          {children}
          <Toaster position="bottom-right" />
        </LanguageProvider>
      </DarkModeProvider>
    </SessionProvider>
  );
}