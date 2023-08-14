import { useEffect } from 'react';
import { DispatchCanvasStateSocketPayload, SocketNames } from '@doodle-together/shared';

import socket from '@modules/socket/lib/socket.lib';
import { useRoomStore } from '@modules/state/room.slice';

export const useDispatchRoomCanvasStateSocket = () => {
  const { canvasRef } = useRoomStore();

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const context = canvasElement?.getContext('2d')!;

    socket.on(SocketNames.DISPATCH_CANVAS_STATE, (data: DispatchCanvasStateSocketPayload) => {
      const { canvasState } = data;

      if (!canvasElement) return;

      const canvasStateImage = new Image();
      canvasStateImage.src = canvasState;
      canvasStateImage.onload = () => {
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        context.drawImage(canvasStateImage, 0, 0);
      };
    });

    return () => {
      socket.off(SocketNames.DISPATCH_CANVAS_STATE);
    };
  }, [canvasRef]);
};
