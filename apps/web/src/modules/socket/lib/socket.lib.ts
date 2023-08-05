import { Socket, io } from 'socket.io-client';

export const initializeSocketConnection = (): Socket => {
  const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/rooms`, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
    auth: {
      accessToken: window.localStorage.getItem('accessToken'),
    },
  });

  return socket;
};
