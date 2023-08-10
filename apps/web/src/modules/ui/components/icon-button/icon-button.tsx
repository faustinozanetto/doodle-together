'use client';

import React from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@modules/ui/lib/ui.lib';

export const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 ring-offset-background disabled:hover:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        xs: 'p-1',
        sm: 'p-2',
        default: 'p-2.5',
        lg: 'p-3',
        xl: 'text-lg px-7 py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type IconButtonStyleProps = VariantProps<typeof iconButtonVariants> & {
  icon: React.ReactNode;
};

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & IconButtonStyleProps;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, type = 'button', icon, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(iconButtonVariants({ variant, size, className }))} type={type} {...props}>
      {icon}
    </button>
  )
);

IconButton.displayName = 'IconButton';
