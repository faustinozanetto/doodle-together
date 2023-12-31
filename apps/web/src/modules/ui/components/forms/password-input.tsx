'use client';

import React, { useState } from 'react';
import { cn } from '@modules/ui/lib/ui.lib';

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {};

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, type, ...rest }, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleVisibilityChange = () => {
      setIsVisible((prev) => !prev);
    };

    return (
      <div className="relative">
        <input
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          type={isVisible ? 'text' : 'password'}
          {...rest}
        />
        <button
          className="absolute inset-y-0 right-0 pr-3"
          aria-label="Toggle Visibility"
          onClick={handleVisibilityChange}
          type="button"
        >
          {isVisible ? (
            <svg
              className="h-5 w-5 stroke-neutral-700 dark:stroke-neutral-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="2" />
              <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 stroke-neutral-700 dark:stroke-neutral-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="3" y1="3" x2="21" y2="21" />
              <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
              <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
            </svg>
          )}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';
