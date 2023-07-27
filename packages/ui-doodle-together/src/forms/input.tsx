'use client';

import React from 'react';
import { cn } from '../lib/ui.lib';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'ui-border-input ui-ring-offset-background ui-flex ui-h-10 ui-w-full ui-rounded-lg ui-border ui-bg-transparent ui-px-3 ui-py-2 ui-text-sm file:ui-border-0 file:ui-bg-transparent file:ui-text-sm file:ui-font-medium focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-offset-2 disabled:ui-cursor-not-allowed disabled:ui-opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';
