'use client';

import React from 'react';
import { ThemeProvider } from 'next-theme-kit';
import { ToastsProvider } from '@modules/ui/components/toasts/context/toasts-context';
import { ToastsContainer } from '@modules/ui/components/toasts/components/toasts-container';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
    <ThemeProvider useSystem={false} useLocalStorage>
      <ToastsProvider>
        {children}
        <ToastsContainer position="bottom-right" />
      </ToastsProvider>
    </ThemeProvider>
  );
};

export default Providers;
