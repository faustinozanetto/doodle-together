import { User } from '@doodle-together/database';
import { useSnapshot } from 'valtio';
import { roomState } from '@modules/state/room.slice';

export const useIsRoomOwner = (user: User | null): { isRoomOwner: boolean } => {
  const roomSnapshot = useSnapshot(roomState);

  if (!user || !roomSnapshot.room) return { isRoomOwner: false };

  const isRoomOwner = user.id === roomSnapshot.room.ownerId;

  return { isRoomOwner };
};
