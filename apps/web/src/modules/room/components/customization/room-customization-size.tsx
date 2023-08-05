'use client';

import React from 'react';
import { RoomToolSize } from '@modules/room/types/room.types';
import { IconButton } from '@modules/ui/components/icon-button/icon-button';
import { Separator } from '@modules/ui/components/separator/separator';
import { useSnapshot } from 'valtio';
import { customizationActions, customizationState } from '@modules/state/customization.slice';

const TOOL_SIZES: ToolSizeOptionProps[] = [
  {
    size: 'small',
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
        <path d="M17 8a4 4 0 0 0 -4 -4h-2a4 4 0 0 0 0 8h2a4 4 0 0 1 0 8h-2a4 4 0 0 1 -4 -4" />
      </svg>
    ),
  },
  {
    size: 'medium',
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
        <path d="M6 20v-16l6 14l6 -14v16" />
      </svg>
    ),
  },
  {
    size: 'large',
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
        <path d="M7 4v16h10" />
      </svg>
    ),
  },
  {
    size: 'extra-large',
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
        <line x1="7" y1="4" x2="17" y2="20" />
        <line x1="17" y1="4" x2="7" y2="20" />
      </svg>
    ),
  },
];

type ToolSizeOptionProps = {
  icon: React.ReactNode;
  size: RoomToolSize;
};

const ToolSizeOption: React.FC<ToolSizeOptionProps> = (props) => {
  const { size, icon } = props;

  const customizationSnapshot = useSnapshot(customizationState);

  const handleSelectSize = () => {
    customizationActions.setSize(size);
  };

  return (
    <IconButton
      aria-label={`${size} Size`}
      variant={size === customizationSnapshot.size ? 'primary' : 'ghost'}
      onClick={handleSelectSize}
      icon={icon}
    />
  );
};

const RoomCustomizationSize: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold">Size</span>
      <Separator />
      <div className="flex gap-1 mx-auto">
        {TOOL_SIZES.map((size) => {
          return <ToolSizeOption key={size.size} {...size} />;
        })}
      </div>
    </div>
  );
};

export default RoomCustomizationSize;
