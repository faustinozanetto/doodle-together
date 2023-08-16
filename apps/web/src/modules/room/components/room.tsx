'use client';

import React, { useEffect } from 'react';

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
import { Canvas, CanvasProvider } from '@doodle-together/canvas-renderer';

import { useMeStore } from '@modules/state/me.slice';
import { getDataFromToken } from '@modules/common/lib/common.lib';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@config/config';
import socket from '@modules/socket/lib/socket.lib';
import { useRoomStore } from '@modules/state/room.slice';

type RoomProps = {
  room: RoomWithUsers;
};

const Room: React.FC<RoomProps> = (props) => {
  const { room } = props;

  const router = useRouter();
  const { setRoom } = useRoomStore();

  const { setMe, setAccessToken, clearAccessToken } = useMeStore();

  useRoomNotifications();

  // Socket hooks
  useUpdateRoomSocket();
  useDeleteRoomSocket();
  useKickRequestRoomSocket();

  useEffect(() => {
    if (!room) {
      console.log('Invalid room!');
      return router.push('/');
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.log('Invalid access token!');

      const joinRoomURL = new URL('/room/join', siteConfig.url);
      joinRoomURL.searchParams.append('roomId', room.id);
      return router.push(joinRoomURL.toString());
    }

    const { sub: userId, roomId, username, exp: accessTokenExpiry } = getDataFromToken(accessToken);

    if (roomId !== room.id) {
      console.log('Room ids do not match!');
      clearAccessToken();
      return router.push('/');
    }

    const currentTimeInSeconds = Date.now() / 1000;
    if (accessTokenExpiry <= currentTimeInSeconds) {
      console.log('Access token expired!');

      clearAccessToken();
      return router.push('/');
    }

    const user: User = {
      id: userId,
      roomId,
      username,
    };

    setRoom(room);
    setMe(user);
    setAccessToken(accessToken);

    socket.emit(SocketNames.CLIENT_READY);
  }, []);

  return (
    <CanvasProvider>
      <div className="fixed bottom-0 right-0 left-0 top-20 overflow-hidden">
        {/* <RoomCanvas /> */}
        <Canvas />

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
    </CanvasProvider>
  );
};

export default Room;
