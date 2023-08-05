import { User } from '@doodle-together/types';
import { roomState } from '@modules/state/room.slice';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

export const useIsRoomOwner = (user: User | undefined) => {
  const roomSnapshot = useSnapshot(roomState);

  const [isRoomOwner, setIsRoomOwner] = useState<boolean>(false);

  useEffect(() => {
    const isOwner = (roomSnapshot && roomSnapshot.room && user && user.userId === roomSnapshot.room.ownerId) ?? false;
    setIsRoomOwner(isOwner);
  }, [user, roomSnapshot]);

  return { isRoomOwner };
};
