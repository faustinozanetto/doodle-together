import { useEffect } from 'react';
import { SocketNames, UpdateCanvasStateSocketPayload } from '@doodle-together/shared';
import { socketState } from '@modules/state/socket.slice';

type UseUpdateRoomCanvasStateSocketProps = {
  onCanvasUpdated: (data: UpdateCanvasStateSocketPayload) => void;
};

export const useUpdateRoomCanvasStateSocket = ({ onCanvasUpdated }: UseUpdateRoomCanvasStateSocketProps) => {
  useEffect(() => {
    socketState.socket?.on(SocketNames.UPDATE_CANVAS_STATE, (data: UpdateCanvasStateSocketPayload) => {
      onCanvasUpdated(data);
    });

    return () => {
      socketState.socket?.off(SocketNames.UPDATE_CANVAS_STATE);
    };
  }, []);
};
