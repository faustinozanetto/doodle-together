import React from 'react';
import { cn } from '@modules/ui/lib/ui.lib';
import { BaseIconProps, iconVariants } from './base-icon';

export type CircleIconProps = BaseIconProps;

export const CircleIcon = React.forwardRef<SVGSVGElement, CircleIconProps>(({ className, size, ...props }, ref) => (
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
    <circle cx="12" cy="12" r="9" />
  </svg>
));

CircleIcon.displayName = 'Circle Icon';
