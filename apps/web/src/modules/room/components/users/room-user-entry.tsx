import React from 'react';
import { User } from '@doodle-together/database';
import { cn } from '@modules/ui/lib/ui.lib';
import { useIsRoomOwner } from '@modules/room/hooks/use-is-room-owner';
import RoomUserOwnerDecor from './room-user-owner-decor';

type RoomUserEntryProps = {
  isCurrentUser: boolean;
  user: User;
};

const RoomUserEntry: React.FC<RoomUserEntryProps> = (props) => {
  const { user, isCurrentUser } = props;

  const { isRoomOwner } = useIsRoomOwner(user);

  return (
    <div className="flex gap-1 items-center justify-between">
      <span
        className={cn('font-medium', isCurrentUser && 'underline decoration-2 decoration-primary underline-offset-2')}
      >
        {user.username}
      </span>
      {isRoomOwner && <RoomUserOwnerDecor />}
    </div>
  );
};

export default RoomUserEntry;
