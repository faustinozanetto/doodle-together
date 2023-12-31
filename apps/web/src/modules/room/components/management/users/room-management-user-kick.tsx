import React, { useCallback } from 'react';

import { KickUserSocketPayload, SocketNames } from '@doodle-together/shared';
import { iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip';

import { User } from '@doodle-together/database';
import socket from '@modules/socket/lib/socket.lib';
import { useRoomStore } from '@modules/state/room.slice';

type RoomManagementUserKickProps = {
  user: User;
};

const RoomManagementUserKick: React.FC<RoomManagementUserKickProps> = (props) => {
  const { user } = props;
  const { username, id } = user;
  const { room } = useRoomStore();

  const label = `Kick ${username}`;

  const handleUserKick = useCallback(() => {
    if (!room) return;

    const payload: KickUserSocketPayload = {
      userId: id,
      roomId: room.id,
    };

    socket.emit(SocketNames.KICK_USER, payload);
  }, [room, id]);

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger aria-label={label} onClick={handleUserKick}>
          <div
            className={iconButtonVariants({
              size: 'sm',
              variant: 'destructive',
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
