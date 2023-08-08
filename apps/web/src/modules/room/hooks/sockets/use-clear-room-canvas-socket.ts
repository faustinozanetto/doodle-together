import React, { ElementRef, useEffect } from 'react';
import { SocketNames } from '@doodle-together/shared';
import { socketState } from '@modules/state/socket.slice';

type UseClearRoomCanvasSocketProps = {
  canvasRef: React.RefObject<ElementRef<'canvas'>>;
  onCanvasCleared: () => void;
};

export const useClearRoomCanvasSocket = ({ canvasRef, onCanvasCleared }: UseClearRoomCanvasSocketProps) => {
  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const context = canvasElement.getContext('2d');

    socketState.socket?.on(SocketNames.CLEAR_CANVAS, () => {
      if (!context) return;

      onCanvasCleared();
    });

    return () => {
      socketState.socket?.off(SocketNames.CLEAR_CANVAS);
    };
  }, [canvasRef]);
};
