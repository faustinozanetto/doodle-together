import React from 'react';

import { User } from '@doodle-together/types';
import { cn } from '@modules/ui/lib/ui.lib';
import { IconButton } from '@modules/ui/components/icon-button/icon-button';
import RoomManagementUserKick from './room-management-user-kick';

type RoomManagementUserProps = {
  user: User;
  isOwner: boolean;
};

const RoomManagementUser: React.FC<RoomManagementUserProps> = (props) => {
  const { user, isOwner } = props;
  const { username, userId } = user;

  return (
    <div
      className={cn(
        'flex gap-2 items-center bg-background shadow-lg rounded-lg border p-2',
        isOwner && 'border-primary-400 dark:border-primary-500 border-2'
      )}
    >
      <div className="bg-foreground rounded-full shadow-lg border p-2">
        <svg
          className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-50"
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
      {!isOwner && <RoomManagementUserKick user={user} />}
    </div>
  );
};

export default RoomManagementUser;
