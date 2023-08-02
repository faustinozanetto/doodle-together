import { User } from '@doodle-together/types';
import { state } from '@modules/state/store';
import { useMemo } from 'react';
import { useSnapshot } from 'valtio';

type UseRoomUsersProps = {
  sortUsers?: boolean;
};

export const useRoomUsers = ({ sortUsers = false }: UseRoomUsersProps) => {
  const currentState = useSnapshot(state);

  const users = useMemo(() => {
    if (currentState.room === undefined) return [];

    const users: User[] = Object.entries(currentState.room?.users ?? {}).map(([userId, { username }]) => {
      return { userId, username };
    });

    if (sortUsers)
      users.sort((a) => {
        if (a.userId === currentState.room?.ownerId) return -1;
        return 1;
      });

    return users;
  }, [currentState.room]);

  return { users };
};
