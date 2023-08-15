import { useRoomStore } from '@modules/state/room.slice';
import { useMemo } from 'react';

type UseRoomUsersProps = {
  sortUsers?: boolean;
};

export const useRoomUsers = ({ sortUsers = false }: UseRoomUsersProps) => {
  const { room } = useRoomStore();

  const users = useMemo(() => {
    if (!room) return [];

    const roomUsers = Array.from(room.users);

    if (sortUsers)
      roomUsers.sort((user) => {
        if (user.id === room?.ownerId) return -1;
        return 1;
      });

    return roomUsers;
  }, [room, sortUsers]);

  return { users };
};
