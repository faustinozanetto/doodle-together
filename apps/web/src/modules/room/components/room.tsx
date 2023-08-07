'use client';

import React, { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import { meActions, meState } from '@modules/state/me.slice';
import { socketActions, socketState } from '@modules/state/socket.slice';
import { roomActions, roomState } from '@modules/state/room.slice';
import { useRoomNotifications } from '../hooks/use-room-notifications';
import RoomManagement from './management/room-management';
import RoomUsers from './users/room-users';
import RoomCustomization from './customization/room-customization';
import RoomCanvas from './canvas/room-canvas';
import RoomTools from './tools/room-tools';
import {
  LeaveRoomApiResponse,
  RequestCanvasStateSocketPayload,
  SocketNames,
  UpdateRoomSocketPayload,
} from '@doodle-together/shared';
import { User } from '@doodle-together/database';

type RoomProps = {
  user: User;
};

const Room: React.FC<RoomProps> = (props) => {
  const { user } = props;

  const router = useRouter();
  const { roomId } = useParams();

  useRoomNotifications();

  const { fetchData } = useApiFetch<LeaveRoomApiResponse>('/rooms/leave');

  // Socket and user initialization
  useEffect(() => {
    // const accessToken = window.localStorage.getItem('accessToken');

    // if (!accessToken) {
    //   const joinRoomURL = new URL('/room/join', siteConfig.url);
    //   joinRoomURL.searchParams.append('roomId', roomId as string);
    //   return router.push(joinRoomURL.toString());
    // }

    // const { exp } = getDataFromToken(accessToken);
    // const currentTime = Date.now() / 1000;

    // if (exp < currentTime) {
    //   meActions.clearAccessToken();
    //   router.push('/');
    //   return;
    // }
    meActions.setMe(user);
    socketActions.initializeSocket();
  }, []);

  useEffect(() => {
    socketState.socket?.on('connect', () => {
      if (!meState.me) return;

      // Send a socket to request the current canvas state.
      const payload: RequestCanvasStateSocketPayload = {
        roomId: roomId as string,
        userId: meState.me.id,
      };

      socketState.socket?.emit(SocketNames.REQUEST_CANVAS_STATE, payload);
    });

    socketState.socket?.on(SocketNames.UPDATE_ROOM, (data: UpdateRoomSocketPayload) => {
      const { room } = data;
      roomActions.setRoom(room);
    });

    socketState.socket?.on(SocketNames.KICK_REQUEST, async () => {
      const { room } = roomState;
      const { me } = meState;

      if (!room || !me) return;

      const response = await fetchData({
        method: 'POST',
        body: JSON.stringify({
          roomId: room.id,
          userId: me.id,
        }),
      });

      if (!response) return;

      socketState.socket?.disconnect();

      router.push('/');
    });

    return () => {
      socketState.socket?.off(SocketNames.UPDATE_ROOM);
      socketState.socket?.off(SocketNames.KICK_REQUEST);
      socketState.socket?.off(SocketNames.REQUEST_CANVAS_STATE);
    };
  }, [roomId]);

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
