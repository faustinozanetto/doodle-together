'use client';

import React, { createContext, useEffect, useReducer, useState } from 'react';
import { Socket } from 'socket.io-client';

import { io } from 'socket.io-client';

export const SocketContext = createContext<{ socket: Socket | null }>({ socket: null });

type SocketProviderProps = {
  children: React.ReactNode;
};

export const SocketProvider: React.FC<SocketProviderProps> = (props) => {
  const { children } = props;

  const [socketClient, setSocketClient] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io('http://localhost:81', { withCredentials: true, transports: ['websocket'] });
    socket.on('connect', () => {
      console.log('Socket client connected!');
    });
    setSocketClient(socket);

    return () => socket.disconnect();
  }, [setSocketClient]);

  return <SocketContext.Provider value={{ socket: socketClient }}>{children}</SocketContext.Provider>;
};
