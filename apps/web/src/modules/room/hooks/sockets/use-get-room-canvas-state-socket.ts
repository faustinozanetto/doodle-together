import { useEffect } from 'react';
import { GetCanvasStateSocketPayload, SendCanvasStateSocketPayload, SocketNames } from '@doodle-together/shared';

import { useRoomStore } from '@modules/state/room.slice';

import socket from '@modules/socket/lib/socket.lib';

export const useGetRoomCanvasStateSocket = () => {
  const { canvasRef } = useRoomStore();

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const context = canvasElement?.getContext('2d')!;

    socket.on(SocketNames.GET_CANVAS_STATE, (data: GetCanvasStateSocketPayload) => {
      const { userId } = data;

      if (!canvasElement) return;

      const canvasState = canvasRef.current.toDataURL();
      const payload: SendCanvasStateSocketPayload = {
        canvasState,
        userId,
      };

      socket.emit(SocketNames.SEND_CANVAS_STATE, payload);
    });

    return () => {
      socket.off(SocketNames.GET_CANVAS_STATE);
    };
  }, [canvasRef]);
};
