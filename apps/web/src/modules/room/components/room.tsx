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
import { meActions, meState } from '@modules/state/me.slice';
import { getDataFromToken } from '@modules/common/lib/common.lib';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@config/config';

type RoomProps = {
  room: RoomWithUsers;
};

const Room: React.FC<RoomProps> = (props) => {
  const { room } = props;

  const router = useRouter();

  useRoomNotifications();

  // Socket hooks
  useUpdateRoomSocket();
  useDeleteRoomSocket();
  useKickRequestRoomSocket();

  console.log('room reenderer');

  useEffect(() => {
    if (!room) return router.push('/');

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      const joinRoomURL = new URL('/room/join', siteConfig.url);
      joinRoomURL.searchParams.append('roomId', room.id);
      return router.push(joinRoomURL.toString());
    }

    try {
      const { sub: userId, roomId, username, exp: accessTokenExpiry } = getDataFromToken(accessToken);

      const currentTimeInSeconds = Date.now() / 1000;
      if (accessTokenExpiry <= currentTimeInSeconds) {
        meActions.clearAccessToken();
        return router.push('/');
      }

      const user: User = {
        id: userId,
        roomId,
        username,
      };

      roomActions.setRoom(room);
      meActions.setMe(user);
      meActions.setAccessToken(accessToken);

      socketActions.initializeSocket();

      // Send a socket to request the current canvas state.
      const requestCanvasStatePayload: RequestCanvasStateSocketPayload = {
        roomId: room.id,
        userId: user.id,
      };

      socketState.socket?.emit(SocketNames.CLIENT_READY);
      socketState.socket?.emit(SocketNames.REQUEST_CANVAS_STATE, requestCanvasStatePayload);
    } catch (err) {
      return router.push('/');
    }
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
