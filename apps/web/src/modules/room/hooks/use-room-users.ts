import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { roomState } from '@modules/state/room.slice';

type UseRoomUsersProps = {
  sortUsers?: boolean;
};

export const useRoomUsers = ({ sortUsers = false }: UseRoomUsersProps) => {
  const roomSnapshot = useSnapshot(roomState);

  const users = useMemo(() => {
    if (!roomSnapshot.room) return [];

    const roomUsers = Array.from(roomSnapshot.room.users);

    if (sortUsers)
      roomUsers.sort((user) => {
        if (user.id === roomSnapshot.room?.ownerId) return -1;
        return 1;
      });

    return roomUsers;
  }, [roomSnapshot]);

  return { users };
};
