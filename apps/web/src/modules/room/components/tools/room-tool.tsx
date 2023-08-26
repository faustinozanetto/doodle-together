'use client';

import React from 'react';

import { iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip';
import { CanvasToolTypes, KeysUtils } from '@doodle-together/canvas-renderer';
import { capitalize } from '@modules/common/lib/common.lib';

export type RoomToolProps = {
  icon: React.ReactNode;
  tool: CanvasToolTypes;
  isSelected: boolean;
  onToolClicked: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const RoomTool: React.FC<RoomToolProps> = (props) => {
  const { icon, tool, onToolClicked, isSelected } = props;

  const label = capitalize(tool);

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger
          className={iconButtonVariants({
            variant: isSelected ? 'default' : 'ghost',
            className: 'relative',
            size: 'lg',
          })}
          aria-label={label}
          onClick={onToolClicked}
        >
          {icon}
          <span className="absolute bottom-1 right-1 text-xs">{KeysUtils.getToolKey(tool)}</span>
        </TooltipTrigger>
        <TooltipContent>
          <span className="font-medium">{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoomTool;
