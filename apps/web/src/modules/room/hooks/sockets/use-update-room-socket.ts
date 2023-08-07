import { SocketNames, UpdateRoomSocketPayload } from '@doodle-together/shared';
import { roomActions } from '@modules/state/room.slice';
import { socketState } from '@modules/state/socket.slice';
import { useEffect } from 'react';

export const useUpdateRoomSocket = () => {
  useEffect(() => {
    socketState.socket?.on(SocketNames.UPDATE_ROOM, (data: UpdateRoomSocketPayload) => {
      const { room } = data;

      roomActions.setRoom(room);
    });

    return () => {
      socketState.socket?.off(SocketNames.UPDATE_ROOM);
    };
  }, []);
};
