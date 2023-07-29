'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Separator } from '@radix-ui/react-separator';
import { RoomUser } from '@modules/room/types/room.types';
import { useRoomContext } from '@modules/room/hooks/use-room-context';
import { SocketContext } from '@modules/socket/context/socket.context';

const RoomUsers: React.FC = () => {
  const { state } = useRoomContext();
  const { socket } = useContext(SocketContext);

  const [users, setUsers] = useState<RoomUser[]>([]);

  useEffect(() => {
    if (!socket) return;
    console.log('update users hook');

    socket.on('update-users', (data: { roomUsers: RoomUser[] }) => {
      console.log({ data });

      setUsers(data.roomUsers);
    });

    return () => {
      socket.off('update-users');
    };
  }, [socket, state.roomId]);

  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border pointer-events-auto h-fit">
      <span className="font-bold">Users</span>
      <Separator />
      {users.map((user) => {
        return <span key={user.userId}>{JSON.stringify(user)}</span>;
      })}
    </div>
  );
};

export default RoomUsers;
