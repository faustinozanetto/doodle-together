'use client';

import React, { createContext } from 'react';
import { Socket } from 'socket.io-client';

import { io } from 'socket.io-client';

export const SocketContext = createContext<{ socket: Socket | null }>({ socket: null });

type SocketProviderProps = {
  children: React.ReactNode;
};

const socket = io('http://localhost:4000/rooms', {
  withCredentials: true,
  transports: ['websocket'],
});

export const SocketProvider: React.FC<SocketProviderProps> = (props) => {
  const { children } = props;

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
