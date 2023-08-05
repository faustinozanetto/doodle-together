import React from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@modules/ui/lib/ui.lib';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
        xs: 'text-xs h-6 px-3',
        sm: 'text-sm h-8 px-4',
        base: 'h-9 md:h-10 px-4',
        lg: 'text-lg h-12 px-5',
        xl: 'text-xl h-14 px-6',
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
    // eslint-disable-next-line react/require-default-props
    icon?: React.ReactNode;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = 'button', icon, children, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} type={type} {...props}>
      {icon ? <span className="mr-2">{icon}</span> : null}
      {children}
    </button>
  )
);

Button.displayName = 'Button';
