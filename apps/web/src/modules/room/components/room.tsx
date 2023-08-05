'use client';

import React, { useEffect } from 'react';

import { LeaveRoomApiResponse, RequestCanvasStateSocketPayload, UpdateRoomSocketPayload } from '@doodle-together/types';
import { useParams, useRouter } from 'next/navigation';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import { meActions, meState } from '@modules/state/me.slice';
import { socketActions, socketState } from '@modules/state/socket.slice';
import { roomActions, roomState } from '@modules/state/room.slice';
import { siteConfig } from '@config/config';
import { getDataFromToken } from '@modules/common/lib/common.lib';
import { useRoomNotifications } from '../hooks/use-room-notifications';
import RoomManagement from './management/room-management';
import RoomUsers from './users/room-users';
import RoomCustomization from './customization/room-customization';
import RoomCanvas from './canvas/room-canvas';
import RoomTools from './tools/room-tools';

const Room: React.FC = () => {
  const router = useRouter();
  const { roomId } = useParams();

  useRoomNotifications();

  const { fetchData } = useApiFetch<LeaveRoomApiResponse>('/rooms/leave');

  // Socket and user initialization
  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken');

    if (!accessToken) {
      const joinRoomURL = new URL('/room/join', siteConfig.url);
      joinRoomURL.searchParams.append('roomId', roomId as string);
      return router.push(joinRoomURL.toString());
    }

    const { exp } = getDataFromToken(accessToken);
    const currentTime = Date.now() / 1000;

    if (exp < currentTime) {
      meActions.clearAccessToken();
      router.push('/');
      return;
    }

    meActions.setAccessToken(accessToken);
    socketActions.initializeSocket();
  }, []);

  useEffect(() => {
    socketState.socket?.on('connect', () => {
      if (!meState.me) return;

      // Send a socket to request the current canvas state.
      const payload: RequestCanvasStateSocketPayload = {
        roomId: roomId as string,
        userId: meState.me.userId,
      };

      socketState.socket?.emit('request_canvas_state', payload);
    });

    socketState.socket?.on('update_room', (data: UpdateRoomSocketPayload) => {
      const { room } = data;
      roomActions.setRoom(room);
    });

    socketState.socket?.on('kick_request', async () => {
      const { room } = roomState;
      const { me, accessToken } = meState;

      if (!room || !me) return;

      const response = await fetchData({
        method: 'POST',
        body: JSON.stringify({
          roomId: room.roomId,
          userId: me.userId,
          accessToken,
        }),
      });

      if (!response) return;

      socketState.socket?.disconnect();
      meActions.clearAccessToken();

      router.push('/');
    });

    return () => {
      socketState.socket?.off('update_room');
      socketState.socket?.off('kick_request');
      socketState.socket?.off('request_canvas_state');
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
