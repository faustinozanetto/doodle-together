import React, { ElementRef, useEffect } from 'react';
import { GetCanvasStateSocketPayload, SendCanvasStateSocketPayload, SocketNames } from '@doodle-together/shared';
import { socketState } from '@modules/state/socket.slice';
import { meState } from '@modules/state/me.slice';
import { roomState } from '@modules/state/room.slice';

type UseGetRoomCanvasStateSocketProps = {
  canvasRef: React.RefObject<ElementRef<'canvas'>>;
};

export const useGetRoomCanvasStateSocket = ({ canvasRef }: UseGetRoomCanvasStateSocketProps) => {
  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    socketState.socket?.on(SocketNames.GET_CANVAS_STATE, (data: GetCanvasStateSocketPayload) => {
      const { userId } = data;

      const { room } = roomState;
      const { me } = meState;

      if (!canvasElement || !room || !me) return;

      const canvasState = canvasElement.toDataURL();
      const payload: SendCanvasStateSocketPayload = {
        canvasState,
        userId,
      };

      socketState.socket?.emit(SocketNames.SEND_CANVAS_STATE, payload);
    });

    return () => {
      socketState.socket?.off(SocketNames.GET_CANVAS_STATE);
    };
  }, [canvasRef, roomState, meState]);
};
