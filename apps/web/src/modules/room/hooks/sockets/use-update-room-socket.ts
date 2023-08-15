import { SocketNames, UpdateRoomSocketPayload } from '@doodle-together/shared';
import socket from '@modules/socket/lib/socket.lib';
import { useRoomStore } from '@modules/state/room.slice';

import { useEffect } from 'react';

export const useUpdateRoomSocket = () => {
  const { setRoom } = useRoomStore();

  useEffect(() => {
    socket.on(SocketNames.UPDATE_ROOM, (data: UpdateRoomSocketPayload) => {
      const { room } = data;

      setRoom(room);
    });

    return () => {
      socket.off(SocketNames.UPDATE_ROOM);
    };
  }, []);
};
