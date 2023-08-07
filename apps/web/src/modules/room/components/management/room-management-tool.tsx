'use client';

import React from 'react';

import { IconButtonStyleProps, iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip';

type RoomManagementToolProps = IconButtonStyleProps & {
  children: React.ReactNode;
  label: string;
  onToolClicked: (event: React.MouseEvent<HTMLElement>) => void;
};

const RoomManagementTool: React.FC<RoomManagementToolProps> = (props) => {
  const { children, label, size, variant, onToolClicked, icon } = props;

  return (
    <div
      style={{
        pointerEvents: 'all',
      }}
    >
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger aria-label={label} onClick={onToolClicked} className={iconButtonVariants({ size, variant })}>
            {icon}
          </TooltipTrigger>
          <TooltipContent>
            <span className="font-medium">{label}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {children}
    </div>
  );
};

export default RoomManagementTool;
