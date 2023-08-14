import { meState } from '@modules/state/me.slice';
import { Socket, io } from 'socket.io-client';

export const initializeSocketConnection = (): Socket => {
  const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/rooms`, {
    auth: {
      accessToken: meState.accessToken,
    },
    transports: ['websocket'],
  });

  return socket;
};
