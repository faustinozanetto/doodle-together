import React from 'react';

import { cn } from '@modules/ui/lib/ui.lib';

import { useIsRoomOwner } from '@modules/room/hooks/use-is-room-owner';
import RoomManagementUserKick from './room-management-user-kick';
import { User } from '@doodle-together/database';

type RoomManagementUserProps = {
  user: User;
};

const RoomManagementUser: React.FC<RoomManagementUserProps> = (props) => {
  const { user } = props;
  const { username } = user;

  const { isRoomOwner } = useIsRoomOwner(user);

  return (
    <div
      className={cn(
        'flex gap-2 items-center shadow-lg rounded-lg border p-2',
        isRoomOwner && 'border-primary border-2'
      )}
    >
      <div className="rounded-full shadow-lg border p-2">
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
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
      </div>
      <span className="font-semibold mr-auto">{username}</span>
      {!isRoomOwner && <RoomManagementUserKick user={user} />}
    </div>
  );
};

export default RoomManagementUser;
