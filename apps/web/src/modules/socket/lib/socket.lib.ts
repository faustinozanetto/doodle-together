import { io } from 'socket.io-client';

const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/rooms`, {
  auth: {
    accessToken: typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : undefined,
  },
  transports: ['websocket', 'polling'],
});

socket.on('connect', () => {
  console.log('Socket client connected successfully!');
});

export default socket;
