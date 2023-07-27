import React from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../lib/ui.lib';

export const buttonVariants = cva(
  'ui-inline-flex ui-items-center ui-justify-center ui-rounded-md ui-font-medium focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-ring focus-visible:ui-ring-offset-2 disabled:ui-opacity-50 ui-ring-offset-background disabled:hover:ui-cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'ui-bg-primary-300 hover:ui-bg-primary-400 focus-visible:ui-ring-primary-400 dark:ui-bg-primary-800 dark:hover:ui-bg-primary-900 ui-text-neutral-900 dark:ui-text-neutral-50',
        secondary:
          'ui-bg-secondary-300 hover:ui-bg-secondary-400 focus-visible:ui-ring-secondary-400 dark:ui-bg-secondary-800 dark:hover:ui-bg-secondary-900 ui-text-neutral-900 dark:ui-text-neutral-50',
        outline:
          'ui-bg-transparent hover:ui-bg-primary-100 focus-visible:ui-ring-primary-400 dark:hover:ui-bg-primary-900 ui-text-primary-400 dark:ui-text-neutral-50 ui-border ui-border-primary-400 dark:ui-border-primary-600',
        ghost:
          'ui-bg-transparent hover:ui-bg-primary-300 focus-visible:ui-ring-primary-400 dark:hover:ui-bg-primary-900 ui-text-neutral-900 dark:ui-text-neutral-50',
        danger:
          'ui-bg-transparent hover:ui-bg-red-100 focus-visible:ui-ring-red-400 dark:hover:ui-bg-red-900 ui-text-red-400 dark:ui-text-neutral-50',
        'danger-solid':
          'ui-bg-red-300 hover:ui-bg-red-400 focus-visible:ui-ring-red-400 dark:ui-bg-red-800 dark:hover:ui-bg-red-900 ui-text-neutral-900 dark:ui-text-neutral-50',
        unstyled: '',
      },
      size: {
        xs: 'ui-text-xs ui-h-6 ui-px-3',
        sm: 'ui-text-sm ui-h-8 ui-px-4',
        base: 'ui-h-9 md:ui-h-10 ui-px-4',
        lg: 'ui-text-lg ui-h-12 ui-px-5',
        xl: 'ui-text-xl ui-h-14 ui-px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base',
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: JSX.Element | null;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = 'button', icon, children, variant, size, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} type={type} {...props}>
        {icon ? <span className="ui-mr-2">{icon}</span> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
