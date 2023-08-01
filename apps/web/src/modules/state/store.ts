import { Room, User } from '@doodle-together/types';
import { RoomDrawPointPayload } from '@modules/room/types/room.types';
import { createSocketConnection } from '@modules/socket/lib/socket.lib';
import { Socket } from 'socket.io-client';
import { proxy, ref } from 'valtio/vanilla';

export type AppState = {
  isLoading: boolean;
  room?: Room;
  socket?: Socket;
  me?: User;
};

export const state = proxy<AppState>({ isLoading: false });

export const actions = {
  setRoom: (room?: Room): void => {
    state.room = room;
  },
  setIsLoading: (isLoading: boolean) => {
    state.isLoading = isLoading;
  },
  setMe: (me: User): void => {
    state.me = me;
  },
  sendDrawPoint: (data: Omit<RoomDrawPointPayload, 'context'>) => {
    if (!state.room) return;

    state.socket?.emit('draw_point', { roomId: state.room.roomId, point: data });
  },
  leaveRoom: () => {
    actions.reset();
  },
  reset: (): void => {
    state.socket?.disconnect();
    state.room = undefined;
    state.me = undefined;
    state.isLoading = false;
    state.socket = undefined;
  },
  setupSocket: (): void => {
    if (!state.socket) {
      state.socket = ref(
        createSocketConnection({
          state,
          actions,
        })
      );

      return;
    }

    if (!state.socket.connected) {
      state.socket.connect();
      return;
    }

    actions.setIsLoading(false);
  },
};

export type AppActions = typeof actions;
