'use client';

import React from 'react';

import { iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';
import { RoomTool as RoomToolData } from '@doodle-together/shared';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip';
import { capitalize } from '@modules/common/lib/common.lib';
import { useCustomizationStore } from '@modules/state/customization.slice';

export type RoomToolProps = {
  icon: React.ReactNode;
  tool: RoomToolData;
};

const RoomTool: React.FC<RoomToolProps> = (props) => {
  const { tool, icon } = props;

  const { setTool, tool: stateTool } = useCustomizationStore();

  const handleToolSelection = () => {
    setTool(tool);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger aria-label={`${tool} Tool`} onClick={handleToolSelection}>
          <div className={iconButtonVariants({ variant: stateTool === tool ? 'default' : 'ghost' })}>{icon}</div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="font-medium">{capitalize(tool)}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoomTool;
