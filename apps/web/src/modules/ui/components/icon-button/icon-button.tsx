'use client';

import React from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@modules/ui/lib/ui.lib';

export const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 ring-offset-background disabled:hover:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-300 dark:bg-primary-800 text-neutral-900 hover:bg-primary-400/90 dark:hover:bg-primary-700/90 dark:text-neutral-50',
        secondary:
          'bg-secondary-300 hover:bg-secondary-400 focus-visible:ring-secondary-400 dark:bg-secondary-800 dark:hover:bg-secondary-900 text-neutral-900 dark:text-neutral-50',
        outline:
          'border border-input bg-background hover:bg-primary-400 hover:text-accent-foreground dark:hover:bg-primary-900',
        ghost:
          'bg-transparent hover:bg-primary-300 focus-visible:ring-primary-400 dark:hover:bg-primary-900 text-neutral-900 dark:text-neutral-50',
        danger:
          'bg-transparent hover:bg-red-100 focus-visible:ring-red-400 dark:hover:bg-red-900 text-red-400 dark:text-neutral-50',
        'danger-solid':
          'bg-red-300 dark:bg-red-800 text-neutral-900 hover:bg-red-400 dark:hover:bg-red-700 dark:text-neutral-50',
      },
      size: {
        xs: 'p-1',
        sm: 'p-2',
        base: 'p-2.5',
        lg: 'p-3',
        xl: 'text-lg px-7 py-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base',
    },
  }
);

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButtonVariants> & {
    icon: React.ReactNode;
  };

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, type = 'button', icon, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(iconButtonVariants({ variant, size, className }))} type={type} {...props}>
      {icon}
    </button>
  )
);

IconButton.displayName = 'IconButton';
