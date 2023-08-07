import { RequestCanvasStateSocketPayload, UserJoinedSocketPayload, SocketNames } from '@doodle-together/shared';
import { meState } from '@modules/state/me.slice';
import { socketState } from '@modules/state/socket.slice';
import { useEffect } from 'react';

export const useJoinRoomSocket = (roomId: string) => {
  useEffect(() => {
    socketState.socket?.on('connect', () => {
      const { me } = meState;

      if (!me) return;

      // Send a socket to request the current canvas state.
      const requestCanvasStatePayload: RequestCanvasStateSocketPayload = {
        roomId,
        userId: me.id,
      };

      const userJoinedPayload: UserJoinedSocketPayload = {};

      socketState.socket?.emit(SocketNames.USER_JOINED, userJoinedPayload);
      socketState.socket?.emit(SocketNames.REQUEST_CANVAS_STATE, requestCanvasStatePayload);
    });

    return () => {
      socketState.socket?.off('connect');
    };
  }, []);
};
