import React, { ElementRef, useEffect } from 'react';
import { SocketNames, UpdateCanvasStateSocketPayload } from '@doodle-together/shared';
import { socketState } from '@modules/state/socket.slice';

type UseUpdateRoomCanvasStateSocketProps = {
  canvasRef: React.RefObject<ElementRef<'canvas'>>;
  onCanvasUpdated: (data: UpdateCanvasStateSocketPayload, context: CanvasRenderingContext2D) => void;
};

export const useUpdateRoomCanvasStateSocket = ({ canvasRef, onCanvasUpdated }: UseUpdateRoomCanvasStateSocketProps) => {
  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const context = canvasElement.getContext('2d');

    socketState.socket?.on(SocketNames.UPDATE_CANVAS_STATE, (data: UpdateCanvasStateSocketPayload) => {
      if (!context) return;

      onCanvasUpdated(data, context);
    });

    return () => {
      socketState.socket?.off(SocketNames.UPDATE_CANVAS_STATE);
    };
  }, [canvasRef]);
};
