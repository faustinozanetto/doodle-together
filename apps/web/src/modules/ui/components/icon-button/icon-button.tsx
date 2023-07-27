'use client';
import React from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@modules/ui/lib/ui.lib';

export const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 ring-offset-background disabled:hover:cursor-not-allowed',
  {
    variants: {
      variant: {
        base: 'bg-primary-300 hover:bg-primary-400 focus-visible:ring-primary-400 dark:bg-primary-800 dark:hover:bg-primary-900 text-neutral-900 dark:text-neutral-50',
        outline:
          'bg-transparent hover:bg-primary-100 focus-visible:ring-primary-400 dark:hover:bg-primary-900 text-primary-400 dark:text-neutral-50 border border-primary-400 dark:border-primary-600',
        ghost:
          'bg-transparent hover:bg-primary-100 focus-visible:ring-primary-400 dark:hover:bg-primary-900 text-primary-400 dark:text-neutral-50',
        danger:
          'bg-transparent hover:bg-red-100 focus-visible:ring-red-400 dark:hover:bg-red-900 text-red-400 dark:text-neutral-50',
        unstyled: '',
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
      variant: 'base',
      size: 'base',
    },
  }
);

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButtonVariants> & {
    icon: React.ReactElement | JSX.Element;
  };

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, type = 'button', icon, variant, size, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(iconButtonVariants({ variant, size, className }))} type={type} {...props}>
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
