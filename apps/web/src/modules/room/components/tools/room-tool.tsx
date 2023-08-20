'use client';

import React from 'react';

import { iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip';

export type RoomToolProps = {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const RoomTool: React.FC<RoomToolProps> = (props) => {
  const { icon, label, onClick, isSelected } = props;

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger aria-label={label} onClick={onClick}>
          <div className={iconButtonVariants({ variant: isSelected ? 'default' : 'ghost' })}>{icon}</div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="font-medium">{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoomTool;
