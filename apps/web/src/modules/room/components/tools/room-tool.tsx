'use client';

import React from 'react';
import { IconButton, iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';
import { RoomActionType, RoomTool } from '@modules/room/types/room.types';
import { useRoomContext } from '@modules/room/hooks/use-room-context';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip';
import { capitalize } from '@modules/common/lib/common.lib';

export type RoomToolProps = {
  tool: RoomTool;
  icon: React.ReactNode;
};

const RoomTool: React.FC<RoomToolProps> = (props) => {
  const { tool, icon } = props;

  const { state, dispatch } = useRoomContext();

  const handleToolSelection = () => {
    dispatch({
      type: RoomActionType.SET_TOOL,
      payload: { tool },
    });
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger aria-label={`${tool} Tool`} onClick={handleToolSelection}>
          <div className={iconButtonVariants({ variant: state.tool === tool ? 'primary' : 'ghost' })}>{icon}</div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="font-medium">{capitalize(tool)}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoomTool;
