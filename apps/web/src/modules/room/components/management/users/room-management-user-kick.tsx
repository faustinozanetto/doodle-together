import React, { useCallback } from 'react';

import { KickUserSocketPayload, User } from '@doodle-together/types';
import { iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip';
import { roomState } from '@modules/state/room.slice';
import { socketState } from '@modules/state/socket.slice';

type RoomManagementUserKickProps = {
  user: User;
};

const RoomManagementUserKick: React.FC<RoomManagementUserKickProps> = (props) => {
  const { user } = props;
  const { username, userId } = user;

  const label = `Kick ${username}`;

  const handleUserKick = useCallback(() => {
    const { room } = roomState;
    if (!room) return;

    const payload: KickUserSocketPayload = {
      userId,
      roomId: room.roomId,
    };

    socketState.socket?.emit('kick_user', payload);
  }, [roomState.room]);

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger aria-label={label} onClick={handleUserKick}>
          <div
            className={iconButtonVariants({
              size: 'sm',
              variant: 'danger-solid',
            })}
          >
            <svg
              className="h-5 w-5 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M13 12v.01" />
              <path d="M3 21h18" />
              <path d="M5 21v-16a2 2 0 0 1 2 -2h7.5m2.5 10.5v7.5" />
              <path d="M14 7h7m-3 -3l3 3l-3 3" />
            </svg>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="font-medium">{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoomManagementUserKick;
