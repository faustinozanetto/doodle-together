'use client';
import React from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../lib/ui.lib';

export const iconButtonVariants = cva(
  'ui-inline-flex ui-items-center ui-justify-center ui-rounded-md ui-font-semibold focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-ring focus-visible:ui-ring-offset-2 disabled:ui-opacity-50 ui-ring-offset-background disabled:hover:ui-cursor-not-allowed',
  {
    variants: {
      variant: {
        base: 'ui-bg-primary-300 hover:ui-bg-primary-400 focus-visible:ui-ring-primary-400 dark:ui-bg-primary-800 dark:hover:ui-bg-primary-900 ui-text-neutral-900 dark:ui-text-neutral-50',
        outline:
          'ui-bg-transparent hover:ui-bg-primary-100 focus-visible:ui-ring-primary-400 dark:hover:ui-bg-primary-900 ui-text-primary-400 dark:ui-text-neutral-50 ui-border ui-border-primary-400 dark:ui-border-primary-600',
        ghost:
          'ui-bg-transparent hover:ui-bg-primary-100 focus-visible:ui-ring-primary-400 dark:hover:ui-bg-primary-900 ui-text-primary-400 dark:ui-text-neutral-50',
        danger:
          'ui-bg-transparent hover:ui-bg-red-100 focus-visible:ui-ring-red-400 dark:hover:ui-bg-red-900 ui-text-red-400 dark:ui-text-neutral-50',
        unstyled: '',
      },
      size: {
        xs: 'ui-p-1',
        sm: 'ui-p-2',
        base: 'ui-p-2.5',
        lg: 'ui-p-3',
        xl: 'ui-text-lg ui-px-7 ui-py-4',
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
