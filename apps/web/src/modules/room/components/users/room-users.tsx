import React from 'react';

import { useRoomUsers } from '@modules/room/hooks/use-room-users';

import RoomUserEntry from './room-user-entry';
import RoomPanel from '../room-panel';
import { useMeStore } from '@modules/state/me.slice';

const RoomUsers: React.FC = () => {
  const { me } = useMeStore();
  const { users } = useRoomUsers({ sortUsers: true });

  return (
    <RoomPanel className="min-w-[10rem]" label="Users">
      <ul className="flex flex-col gap-2">
        {users.map((user) => {
          const isCurrentUser = (me && me.id === user.id) ?? false;

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
