'use client';

import React from 'react';
import { useSnapshot } from 'valtio';
import { iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';
import { RoomTool as RoomToolData } from '@doodle-together/shared';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip';
import { capitalize } from '@modules/common/lib/common.lib';
import { customizationActions, customizationState } from '@modules/state/customization.slice';

export type RoomToolProps = {
  icon: React.ReactNode;
  tool: RoomToolData;
};

const RoomTool: React.FC<RoomToolProps> = (props) => {
  const { tool, icon } = props;

  const customizationSnapshot = useSnapshot(customizationState);

  const handleToolSelection = () => {
    customizationActions.setTool(tool);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger aria-label={`${tool} Tool`} onClick={handleToolSelection}>
          <div className={iconButtonVariants({ variant: customizationSnapshot.tool === tool ? 'primary' : 'ghost' })}>
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="font-medium">{capitalize(tool)}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoomTool;
