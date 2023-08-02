import React from 'react';
import { User } from '@doodle-together/types';
import { cn } from '@modules/ui/lib/ui.lib';
import RoomUserOwnerDecor from './room-user-owner-decor';

type RoomUserEntryProps = {
  user: User;
  isCurrentUser: boolean;
  isOwner: boolean;
};

const RoomUserEntry: React.FC<RoomUserEntryProps> = (props) => {
  const { user, isCurrentUser, isOwner } = props;

  return (
    <div className="flex gap-1 items-center justify-between">
      <span
        className={cn(
          'font-medium',
          isCurrentUser &&
            'underline decoration-2 decoration-primary-600 underline-offset-2 dark:decoration-primary-400'
        )}
      >
        {user.username}
      </span>
      {isOwner && <RoomUserOwnerDecor />}
    </div>
  );
};

export default RoomUserEntry;
