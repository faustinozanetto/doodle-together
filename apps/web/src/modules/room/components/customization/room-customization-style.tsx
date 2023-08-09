'use client';

import React from 'react';
import { useSnapshot } from 'valtio';
import { IconButton } from '@modules/ui/components/icon-button/icon-button';
import { Separator } from '@modules/ui/components/separator/separator';
import { customizationActions, customizationState } from '@modules/state/customization.slice';
import { RoomToolStyle } from '@doodle-together/shared';

const TOOL_STYLES: ToolStyleOptionProps[] = [
  {
    style: 'solid',
    icon: (
      <svg
        className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    style: 'dotted',
    icon: (
      <svg
        className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="7.5" y1="4.21" x2="7.5" y2="4.22" />
        <line x1="4.21" y1="7.5" x2="4.21" y2="7.51" />
        <line x1="3" y1="12" x2="3" y2="12.01" />
        <line x1="4.21" y1="16.5" x2="4.21" y2="16.51" />
        <line x1="7.5" y1="19.79" x2="7.5" y2="19.8" />
        <line x1="12" y1="21" x2="12" y2="21.01" />
        <line x1="16.5" y1="19.79" x2="16.5" y2="19.8" />
        <line x1="19.79" y1="16.5" x2="19.79" y2="16.51" />
        <line x1="21" y1="12" x2="21" y2="12.01" />
        <line x1="19.79" y1="7.5" x2="19.79" y2="7.51" />
        <line x1="16.5" y1="4.21" x2="16.5" y2="4.22" />
        <line x1="12" y1="3" x2="12" y2="3.01" />
      </svg>
    ),
  },
  {
    style: 'dashed',
    icon: (
      <svg
        className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
        <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
        <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
        <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
        <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
        <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
        <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
        <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
      </svg>
    ),
  },
];

type ToolStyleOptionProps = {
  icon: React.ReactNode;
  style: RoomToolStyle;
};

const ToolStyleOption: React.FC<ToolStyleOptionProps> = (props) => {
  const { style, icon } = props;

  const customizationSnapshot = useSnapshot(customizationState);

  const handleSelectStyle = () => {
    customizationActions.setStyle(style);
  };

  return (
    <IconButton
      aria-label={`${style} Style`}
      variant={style === customizationSnapshot.style ? 'primary' : 'ghost'}
      onClick={handleSelectStyle}
      icon={icon}
    />
  );
};

const RoomCustomizationStyle: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold">Style</span>
      <Separator />
      <div className="flex gap-1 mx-auto">
        {TOOL_STYLES.map((style) => {
          return <ToolStyleOption key={style.style} {...style} />;
        })}
      </div>
    </div>
  );
};

export default RoomCustomizationStyle;
