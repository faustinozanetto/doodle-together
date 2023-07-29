'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRoomContext } from '@modules/room/hooks/use-room-context';
import { SocketContext } from '@modules/socket/context/socket.context';
import { User } from '@doodle-together/types';
import RoomUserEntry from './room-user-entry';
import { Separator } from '@modules/ui/components/separator/separator';

const RoomUsers: React.FC = () => {
  const { state } = useRoomContext();
  const { socket } = useContext(SocketContext);

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('update_users', (data: { users: User[] }) => {
      setUsers(users);
    });

    return () => {
      socket.off('update_users');
    };
  }, [socket, state.roomId, setUsers]);

  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border pointer-events-auto h-fit">
      <span className="font-bold">Users</span>
      <Separator />
      <ul>
        {users.map((user) => {
          return <RoomUserEntry key={user.userId} user={user} />;
        })}
      </ul>
    </div>
  );
};

export default RoomUsers;
