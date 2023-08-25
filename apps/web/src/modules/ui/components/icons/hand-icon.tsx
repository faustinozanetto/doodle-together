import React from 'react';
import { cn } from '@modules/ui/lib/ui.lib';
import { BaseIconProps, iconVariants } from './base-icon';

export type HandIconProps = BaseIconProps;

export const HandIcon = React.forwardRef<SVGSVGElement, HandIconProps>(({ className, size, ...props }, ref) => (
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
    <path d="M8 11v-3.5a1.5 1.5 0 0 1 3 0v2.5" />
    <path d="M11 9.5v-3a1.5 1.5 0 0 1 3 0v3.5" />
    <path d="M14 7.5a1.5 1.5 0 0 1 3 0v2.5" />
    <path d="M17 9.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
  </svg>
));

HandIcon.displayName = 'HandIcon';
