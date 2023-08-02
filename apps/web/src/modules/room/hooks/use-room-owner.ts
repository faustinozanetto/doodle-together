import { state } from '@modules/state/store';
import { useSnapshot } from 'valtio';
import { useRoomUsers } from './use-room-users';
import { useMemo } from 'react';

export const useRoomOwner = () => {
  const currentState = useSnapshot(state);
  const { users } = useRoomUsers({ sortUsers: false });

  const owner = useMemo(() => {
    if (currentState.room === undefined) return null;

    return users.find((user) => user.userId === currentState.room?.ownerId) ?? null;
  }, [users]);

  return owner;
};
