'use client';

import React, { useEffect } from 'react';

import { meActions } from '@modules/state/me.slice';
import { socketActions } from '@modules/state/socket.slice';
import { useRoomNotifications } from '../hooks/use-room-notifications';
import RoomManagement from './management/room-management';
import RoomUsers from './users/room-users';
import RoomCustomization from './customization/room-customization';
import RoomCanvas from './canvas/room-canvas';
import RoomTools from './tools/room-tools';

import { User } from '@doodle-together/database';
import { useUpdateRoomSocket } from '../hooks/sockets/use-update-room-socket';
import { useJoinRoomSocket } from '../hooks/sockets/use-join-room-socket';
import { useDeleteRoomSocket } from '../hooks/sockets/use-delete-room-socket';
import { useKickRequestRoomSocket } from '../hooks/sockets/use-kick-request-room-socket';
import { useParams } from 'next/navigation';

type RoomProps = {
  user: User;
};

const Room: React.FC<RoomProps> = (props) => {
  const { user } = props;

  const { roomId } = useParams();

  useRoomNotifications();

  // Socket and user initialization
  useEffect(() => {
    meActions.setMe(user);
    socketActions.initializeSocket();
  }, []);

  // Socket hooks
  useJoinRoomSocket(roomId as string);
  useUpdateRoomSocket();
  useDeleteRoomSocket();
  useKickRequestRoomSocket();

  return (
    <div className="fixed bottom-0 right-0 left-0 top-20 overflow-hidden">
      <RoomCanvas />

      {/* Panels */}
      <div className="pointer-events-none absolute inset-0 p-2 flex flex-col justify-between select-none overflow-clip">
        {/* Top */}
        <div className="flex justify-between items-start">
          <RoomUsers />
          <RoomCustomization />
        </div>

        {/* Bottom  */}
        <div className="flex justify-between items-end">
          <RoomTools />
          <RoomManagement />
        </div>
      </div>
    </div>
  );
};

export default Room;
