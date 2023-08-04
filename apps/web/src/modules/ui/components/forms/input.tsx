'use client';

import React from 'react';
import { cn } from '@modules/ui/lib/ui.lib';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...rest }, ref) => (
  <input
    type={type}
    className={cn(
      'border-input ring-offset-background flex h-10 w-full rounded-lg border bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    {...rest}
  />
));
Input.displayName = 'Input';
