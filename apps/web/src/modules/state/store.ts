import { CanvasPoint, Room, User } from '@doodle-together/types';
import { getDataFromToken } from '@modules/common/lib/common.lib';
import { createSocketConnection } from '@modules/socket/lib/socket.lib';
import { Socket } from 'socket.io-client';
import { proxy, ref } from 'valtio';
import { subscribeKey } from 'valtio/utils';

export type AppState = {
  isLoading: boolean;
  room?: Room;
  accessToken?: string;
  socket?: Socket;
  me?: User;
};

export const state = proxy<AppState>({
  isLoading: false,
  get me() {
    const accessToken = this.accessToken;
    if (!accessToken) return;

    const data = getDataFromToken(accessToken);

    return {
      userId: data.sub,
      username: data.username,
    };
  },
});

export const actions = {
  setAccessToken: (accessToken?: string): void => {
    state.accessToken = accessToken;
  },
  setRoom: (room?: Room): void => {
    state.room = room;
  },
  updateRoom: (room: Room): void => {
    state.room = room;
  },
  setIsLoading: (isLoading: boolean) => {
    state.isLoading = isLoading;
  },
  sendDrawPoint: (point: CanvasPoint) => {
    if (!state.room) return;

    state.socket?.emit('draw_point', { roomId: state.room.roomId, point });
  },
  reset: (): void => {
    state.socket?.disconnect();
    state.room = undefined;
    state.accessToken = undefined;
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

subscribeKey(state, 'accessToken', () => {
  if (state.accessToken) {
    localStorage.setItem('accessToken', state.accessToken);
  }
});

export type AppActions = typeof actions;
