import { User } from '@doodle-together/types';
import { useRoomStore } from '@modules/state/room.slice';
import { useMemo } from 'react';

type UseRoomUsersProps = {
  sortUsers?: boolean;
};

export const useRoomUsers = ({ sortUsers = false }: UseRoomUsersProps) => {
  const { room } = useRoomStore();

  const users = useMemo(() => {
    if (!room) return [];

    const users: User[] = Object.entries(room.users ?? {}).map(([userId, { username }]) => {
      return { userId, username };
    });

    if (sortUsers)
      users.sort((a) => {
        if (a.userId === room.ownerId) return -1;
        return 1;
      });

    return users;
  }, [room]);

  return { users };
};
