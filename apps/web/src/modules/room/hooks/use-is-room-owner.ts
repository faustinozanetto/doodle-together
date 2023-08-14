import { User } from '@doodle-together/database';
import { useRoomStore } from '@modules/state/room.slice';
import { useEffect, useState } from 'react';

export const useIsRoomOwner = (user: User | null): { isRoomOwner: boolean } => {
  const { room } = useRoomStore();

  const [isRoomOwner, setIsRoomOwner] = useState<boolean>(false);

  useEffect(() => {
    if (!user || !room) return;

    setIsRoomOwner(user.id === room.ownerId);
  }, [room, user]);

  return { isRoomOwner };
};
