'use client';

import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@modules/ui/lib/ui.lib';

export const colorInputVariants = cva('color-input shrink-0 border-none', {
  variants: {
    size: {
      sm: 'h-8 w-7',
      base: 'h-10 w-9',
      lg: 'h-12 w-11',
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

export type ColorInputStyles = VariantProps<typeof colorInputVariants>;

export type ColorInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & ColorInputStyles;

export const ColorInput = React.forwardRef<HTMLInputElement, ColorInputProps>((props, ref) => {
  const { size, className, ...rest } = props;

  return <input type="color" className={cn(colorInputVariants({ className, size }))} ref={ref} {...rest} />;
});
ColorInput.displayName = 'ColorInput';
