'use client';

import React from 'react';
import { IconButton } from '@modules/ui/components/icon-button/icon-button';
import { RoomActionType, RoomTool } from '@modules/room/types/room.types';
import { useRoomContext } from '@modules/room/hooks/use-room-context';

type RoomToolProps = {
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
    <IconButton
      aria-label={`${tool} Tool`}
      variant={state.tool === tool ? 'base' : 'ghost'}
      icon={icon}
      onClick={handleToolSelection}
    />
  );
};

export default RoomTool;
