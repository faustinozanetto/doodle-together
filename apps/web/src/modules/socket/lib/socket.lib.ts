import { AppActions, AppState } from '@modules/state/store';
import { Socket, io } from 'socket.io-client';

type SocketConnectionPayload = {
  state: AppState;
  actions: AppActions;
};

export const createSocketConnection = ({ state, actions }: SocketConnectionPayload): Socket => {
  const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/rooms`, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log(`Connected with socket ID: ${socket.id}. userId: ${state.me?.userId} at roomId ${state.room?.roomId}`);
  });

  socket.on('connect_error', () => {
    console.log(`Failed to connect socket`);
  });

  socket.on('exception', (error) => {
    console.log('WS exception: ', error);
  });

  socket.on('room_updated', (data) => {
    const { room } = data;
    console.log('Received update room', room);
    actions.updateRoom(room);
  });

  return socket;
};
