'use client';

import React from 'react';
import { Toast as ToastData } from '../types/toasts.types';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '@modules/ui/lib/ui.lib';

export const toastVariants = cva(
  'flex items-center overflow-hidden rounded-md p-4 text-neutral-900 shadow-md dark:text-neutral-50 text-sm',
  {
    variants: {
      variant: {
        info: 'bg-blue-300 dark:bg-blue-700',
        success: 'bg-green-300 dark:bg-green-700',
        danger: 'bg-red-300 dark:bg-red-700',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  }
);

export type ToastProps = {
  toast: ToastData;
};

export const Toast: React.FC<ToastProps> = (props) => {
  const { toast } = props;

  const toastIcon = () => {
    switch (toast.variant) {
      case 'info': {
        return (
          <svg
            className="h-5 w-5 stroke-neutral-800 dark:stroke-neutral-50"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            height="50px"
            width="50px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z" stroke="none" />
            <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
            <line y2="9" x2="16" y1="9" x1="8" />
            <line y2="13" x2="14" y1="13" x1="8" />
          </svg>
        );
      }
      case 'success': {
        return (
          <svg
            className="h-5 w-5 stroke-neutral-800 dark:stroke-neutral-50"
            xmlns="http://www.w3.org/2000/svg"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#ffffff"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      }
      case 'danger': {
        return (
          <svg
            className="h-5 w-5 stroke-neutral-800 dark:stroke-neutral-50"
            xmlns="http://www.w3.org/2000/svg"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#ffffff"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle r="10" cy="12" cx="12" />
            <line y2="12" x2="12" y1="8" x1="12" />
            <line y2="16" x2="12.01" y1="16" x1="12" />
          </svg>
        );
      }
    }
  };

  return (
    <motion.li
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: 'auto',
        opacity: 1,
        transition: {
          type: 'spring',
          bounce: 0.3,
        },
      }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        duration: 0.6,
        type: 'spring',
        bounce: 0,
      }}
      className="m-2 flex flex-col items-center"
    >
      <div className={cn(toastVariants({ variant: toast.variant }))}>
        <div className="mr-2 flex-shrink-0">{toastIcon()}</div>
        <p className="text-sm font-semibold md:text-base">{toast.content}</p>
      </div>
    </motion.li>
  );
};
