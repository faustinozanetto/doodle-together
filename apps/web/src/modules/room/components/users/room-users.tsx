import React from 'react';

import { useSnapshot } from 'valtio';
import { useRoomUsers } from '@modules/room/hooks/use-room-users';
import { meState } from '@modules/state/me.slice';
import RoomUserEntry from './room-user-entry';
import RoomPanel from '../room-panel';

const RoomUsers: React.FC = () => {
  const meSnapshot = useSnapshot(meState);

  const { users } = useRoomUsers({ sortUsers: true });

  return (
    <RoomPanel className="min-w-[10rem]" label="Users">
      <ul className="flex flex-col gap-2">
        {users.map((user) => {
          const isCurrentUser = (meSnapshot.me && meSnapshot.me.id === user.id) ?? false;

          return (
            <li key={user.id} className="animate-in fade-in">
              <RoomUserEntry user={user} isCurrentUser={isCurrentUser} />
            </li>
          );
        })}
      </ul>
    </RoomPanel>
  );
};

export default RoomUsers;
