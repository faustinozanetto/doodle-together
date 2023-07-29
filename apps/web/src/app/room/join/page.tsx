'use client';

import React, { useContext, useEffect } from 'react';
import JoinRoom from '@modules/room/components/join/join-room';
import { useRouter } from 'next/navigation';
import { SocketContext } from '@modules/socket/context/socket.context';

const JoinRoomPage: React.FC = () => {
  const router = useRouter();

  const { socket } = useContext(SocketContext);

  // We waint until the socket emmits room joined instead of pushing the route when submited the form
  useEffect(() => {
    if (!socket) return;

    socket.on('room-joined', (data) => {
      console.log(`Room Joined: ${JSON.stringify(data)}`);

      router.replace(`/room/${data.roomId}`);
    });

    return () => {
      socket.off('room-joined');
    };
  }, [socket]);

  return <JoinRoom />;
};

export default JoinRoomPage;
