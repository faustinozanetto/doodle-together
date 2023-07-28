import { useContext } from 'react';
import { RoomContext } from '../context/room-context';

/**
 * Hook that returns the room context.
 * @returns The context if valid.
 */
export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) throw new Error('Tried to use RoomContext with no context avaiable!');
  return context;
};
