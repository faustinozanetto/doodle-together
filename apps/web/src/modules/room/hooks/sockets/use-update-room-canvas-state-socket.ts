import { useEffect } from 'react';
import { SocketNames, UpdateCanvasStateSocketPayload } from '@doodle-together/shared';

import { drawPoint, drawEraser } from '@modules/room/lib/room-draw.lib';
import socket from '@modules/socket/lib/socket.lib';
import { useRoomStore } from '@modules/state/room.slice';

export const useUpdateRoomCanvasStateSocket = () => {
  const { canvasRef } = useRoomStore();

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const context = canvasElement?.getContext('2d')!;

    socket.on(SocketNames.UPDATE_CANVAS_STATE, (data: UpdateCanvasStateSocketPayload) => {
      const { data: updateData, tool } = data;

      if (!canvasElement) return;

      if (tool === 'pencil') drawPoint({ ...updateData, context });
      else if (tool === 'eraser') drawEraser({ ...updateData, context });
    });

    return () => {
      socket.off(SocketNames.UPDATE_CANVAS_STATE);
    };
  }, [canvasRef]);
};
