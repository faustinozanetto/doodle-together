import { Socket, io } from 'socket.io-client';

export const initializeSocketConnection = (): Socket => {
  const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/rooms`, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {});

  socket.on('connect_error', () => {
    console.log(`Failed to connect socket`);
  });

  socket.on('exception', (error) => {
    console.log('WS exception: ', error);
  });

  return socket;
};
