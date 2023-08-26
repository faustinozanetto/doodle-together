import React from 'react';
import { cn } from '@modules/ui/lib/ui.lib';
import { BaseIconProps, iconVariants } from './base-icon';

export type TriangleIconProps = BaseIconProps;

export const TriangleIcon = React.forwardRef<SVGSVGElement, TriangleIconProps>(({ className, size, ...props }, ref) => (
  <svg
    ref={ref}
    className={cn(iconVariants({ size }), 'stroke-neutral-900 dark:stroke-neutral-50', className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
  </svg>
));

TriangleIcon.displayName = 'TriangleIcon';
