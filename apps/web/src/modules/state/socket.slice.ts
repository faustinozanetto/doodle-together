import { initializeSocketConnection } from '@modules/socket/lib/socket.lib';
import { Socket } from 'socket.io-client';
import { create } from 'zustand';

export interface SocketSliceState {
  socket: Socket | null;
  resetSocket: () => void;
}

export const useSocketStore = create<SocketSliceState>((set) => ({
  socket: initializeSocketConnection().connect(),
  resetSocket: () => set((state) => ({ socket: null, resetSocket: state.resetSocket })),
}));
