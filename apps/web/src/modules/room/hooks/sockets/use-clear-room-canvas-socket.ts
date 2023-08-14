import { useEffect } from 'react';
import { SocketNames } from '@doodle-together/shared';

import socket from '@modules/socket/lib/socket.lib';
import { useRoomStore } from '@modules/state/room.slice';

type UseClearRoomCanvasSocketProps = {
  onRequestCanvasClear: () => void;
};

export const useClearRoomCanvasSocket = ({ onRequestCanvasClear }: UseClearRoomCanvasSocketProps) => {
  const { room, canvasRef } = useRoomStore();

  useEffect(() => {
    socket.on(SocketNames.CLEAR_CANVAS, () => {
      onRequestCanvasClear();
    });

    return () => {
      socket.off(SocketNames.CLEAR_CANVAS);
    };
  }, [canvasRef, room]);
};
