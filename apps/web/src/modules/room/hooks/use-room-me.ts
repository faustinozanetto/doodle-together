import { User } from '@doodle-together/types';
import { state } from '@modules/state/store';
import { useMemo } from 'react';
import { useSnapshot } from 'valtio';

export const useRoomMe = () => {
  const currentState = useSnapshot(state);

  const me = useMemo(() => {
    const me: User | null = currentState.me ?? null;
    return me;
  }, [currentState.me]);

  return me;
};
