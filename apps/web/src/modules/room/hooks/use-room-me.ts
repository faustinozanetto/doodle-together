import { User } from '@doodle-together/types';
import { state } from '@modules/state/store';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

export const useRoomMe = () => {
  const currentState = useSnapshot(state);
  const [me, setMe] = useState<User | null>(null);

  useEffect(() => {
    setMe(currentState.me ?? null);
  }, [currentState.me]);

  return me;
};
