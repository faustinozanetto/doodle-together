'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '@modules/ui/lib/ui.lib';
import { Toast as ToastData, ToastVariant } from '../types/toasts.types';
import { InfoIcon } from '../../icons/info-icon';
import { DangerIcon } from '../../icons/danger-icon';
import { SuccessIcon } from '../../icons/success-icon';

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

  const TOAST_ICONS: Record<ToastVariant, React.ReactNode> = {
    info: <InfoIcon />,
    danger: <DangerIcon />,
    success: <SuccessIcon />,
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
        <div className="mr-2 flex-shrink-0">{TOAST_ICONS[toast.variant]}</div>
        <p className="text-sm font-semibold md:text-base">{toast.content}</p>
      </div>
    </motion.li>
  );
};
