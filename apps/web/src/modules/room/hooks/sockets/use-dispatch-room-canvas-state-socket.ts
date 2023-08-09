import React, { ElementRef, useEffect } from 'react';
import { DispatchCanvasStateSocketPayload, SocketNames } from '@doodle-together/shared';
import { socketState } from '@modules/state/socket.slice';

type UseDispatchRoomCanvasStateSocketProps = {
  canvasRef: React.RefObject<ElementRef<'canvas'>>;
};

export const useDispatchRoomCanvasStateSocket = ({ canvasRef }: UseDispatchRoomCanvasStateSocketProps) => {
  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const context = canvasElement.getContext('2d');

    socketState.socket?.on(SocketNames.DISPATCH_CANVAS_STATE, (data: DispatchCanvasStateSocketPayload) => {
      const { canvasState } = data;

      if (!canvasElement || !context) return;

      const canvasStateImage = new Image();
      canvasStateImage.src = canvasState;
      canvasStateImage.onload = () => {
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        context.drawImage(canvasStateImage, 0, 0);
      };
    });

    return () => {
      socketState.socket?.off(SocketNames.DISPATCH_CANVAS_STATE);
    };
  }, [canvasRef]);
};
