import React from 'react';
import { cn } from '@modules/ui/lib/ui.lib';
import { BaseIconProps, iconVariants } from './base-icon';

export type UsersIconProps = BaseIconProps;

export const UsersIcon = React.forwardRef<SVGSVGElement, UsersIconProps>(({ className, size, ...props }, ref) => (
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
    <circle cx="9" cy="7" r="4" />
    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
  </svg>
));

UsersIcon.displayName = 'Users Icon';
