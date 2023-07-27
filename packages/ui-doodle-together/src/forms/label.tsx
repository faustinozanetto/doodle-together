'use client';

import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../lib/ui.lib';

const labelVariants = cva(
  'ui-text-sm ui-font-medium ui-leading-none peer-disabled:ui-cursor-not-allowed peer-disabled:ui-opacity-70'
);

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;
