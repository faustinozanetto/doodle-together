import { initializeSocketConnection } from '@modules/socket/lib/socket.lib';
import { Socket } from 'socket.io-client';
import { proxy, ref } from 'valtio';

export type SocketSliceState = {
  socket: Socket | null;
};

export const socketState = proxy<SocketSliceState>({ socket: null });

export const socketActions = {
  initializeSocket: (): void => {
    if (!socketState.socket) {
      socketState.socket = ref(initializeSocketConnection());
      return;
    }

    if (!socketState.socket.connected) {
      socketState.socket.connect();
      return;
    }
  },
};

export type SocketActions = typeof socketActions;