import { User } from '@doodle-together/types';
import { roomState } from '@modules/state/room.slice';
import { useMemo } from 'react';
import { useSnapshot } from 'valtio';

type UseRoomUsersProps = {
  sortUsers?: boolean;
};

export const useRoomUsers = ({ sortUsers = false }: UseRoomUsersProps) => {
  const roomSnapshot = useSnapshot(roomState);

  const users = useMemo(() => {
    if (!roomSnapshot.room) return [];

    const users: User[] = Object.entries(roomSnapshot.room.users ?? {}).map(([userId, { username }]) => {
      return { userId, username };
    });

    if (sortUsers)
      users.sort((a) => {
        if (a.userId === roomSnapshot.room?.ownerId) return -1;
        return 1;
      });

    return users;
  }, [roomSnapshot]);

  return { users };
};
