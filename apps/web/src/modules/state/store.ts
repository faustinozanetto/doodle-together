/*
export type AppState = {
  isLoading: boolean;
  room?: Room;
  socket?: Socket;
  me?: User;
};

export const state = proxy<AppState>({ isLoading: false });

export const actions = {
  setIsLoading: (isLoading: boolean) => {
    state.isLoading = isLoading;
  },
  setRoom: (room?: Room): void => {
    state.room = room;
  },
  setMe: (me: User): void => {
    state.me = me;
  },
  sendDrawPoint: (data: Omit<RoomDrawPointPayload, 'context'>) => {
    if (!state.room) return;

    state.socket?.emit('draw_point', { roomId: state.room.roomId, point: data });
  },
  sendCanvasCleared: () => {
    if (!state.room) return;

    const payload: CanvasClearedSocketPayload = {
      roomId: state.room.roomId,
    };

    state.socket?.emit('canvas_cleared', payload);
  },
  leaveRoom: () => {
    actions.reset();
  },
  reset: (): void => {
    state.socket?.disconnect();
    state.room = undefined;
    state.me = undefined;
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
  },
};

export type AppActions = typeof actions;
*/
