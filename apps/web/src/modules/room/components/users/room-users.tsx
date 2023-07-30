import React from 'react';
import RoomUserEntry from './room-user-entry';
import { Separator } from '@modules/ui/components/separator/separator';
import { useSnapshot } from 'valtio';
import { state } from '@modules/state/store';

const RoomUsers: React.FC = () => {
  const currentState = useSnapshot(state);

  const sortedUsers = Object.entries(currentState.room?.users ?? {}).sort(([userId, username]) => {
    if (currentState.room && currentState.room.ownerId === userId) return -1;
    return 1;
  });

  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border pointer-events-auto h-fit min-w-[10rem]">
      <span className="font-bold">Users</span>
      <Separator />
      <ul className="gap-2 mt-2">
        {sortedUsers.map(([userId, username]) => {
          const isRoomOwner = (currentState.room && currentState.room.ownerId === userId) ?? false;

          const isCurrentUser = (currentState.me && currentState.me.userId === userId) ?? false;

          return (
            <RoomUserEntry
              key={userId}
              user={{ userId, username }}
              isOwner={isRoomOwner}
              isCurrentUser={isCurrentUser}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default RoomUsers;
