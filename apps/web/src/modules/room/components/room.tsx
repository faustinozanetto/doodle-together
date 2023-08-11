'use client';

import React, { useEffect } from 'react';

import { socketActions, socketState } from '@modules/state/socket.slice';
import { useRoomNotifications } from '../hooks/use-room-notifications';
import RoomManagement from './management/room-management';
import RoomUsers from './users/room-users';
import RoomCustomization from './customization/room-customization';
import RoomCanvas from './canvas/room-canvas';
import RoomTools from './tools/room-tools';

import { User } from '@doodle-together/database';
import { useUpdateRoomSocket } from '../hooks/sockets/use-update-room-socket';
import { useDeleteRoomSocket } from '../hooks/sockets/use-delete-room-socket';
import { useKickRequestRoomSocket } from '../hooks/sockets/use-kick-request-room-socket';
import { RequestCanvasStateSocketPayload, RoomWithUsers, SocketNames } from '@doodle-together/shared';
import { roomActions } from '@modules/state/room.slice';
import { meActions } from '@modules/state/me.slice';

type RoomProps = {
  user: User;
  room: RoomWithUsers;
};

const Room: React.FC<RoomProps> = (props) => {
  const { user, room } = props;

  useRoomNotifications();

  // Socket hooks
  useUpdateRoomSocket();
  useDeleteRoomSocket();
  useKickRequestRoomSocket();

  useEffect(() => {
    roomActions.setRoom(room);
    meActions.setMe(user);

    socketActions.initializeSocket();

    // Send a socket to request the current canvas state.
    const requestCanvasStatePayload: RequestCanvasStateSocketPayload = {
      roomId: room.id,
      userId: user.id,
    };

    socketState.socket?.emit(SocketNames.CLIENT_READY);
    socketState.socket?.emit(SocketNames.REQUEST_CANVAS_STATE, requestCanvasStatePayload);
  }, []);

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
