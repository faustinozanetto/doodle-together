'use client';

import React, { useEffect } from 'react';
import RoomTools from './tools/room-tools';
import RoomCanvas from './canvas/room-canvas';

import RoomCustomization from './customization/room-customization';
import RoomUsers from './users/room-users';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import {
  LeaveRoomApiResponse,
  RequestCanvasStateSocketPayload,
  UpdateRoomSocketPayload,
  User,
} from '@doodle-together/types';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import { useParams, useRouter } from 'next/navigation';
import RoomManagement from './management/room-management';
import { useRoomNotifications } from '../hooks/use-room-notifications';
import { meActions, meState } from '@modules/state/me.slice';
import { socketActions, socketState } from '@modules/state/socket.slice';
import { roomActions, roomState } from '@modules/state/room.slice';

type RoomProps = {
  user: User;
};

const Room: React.FC<RoomProps> = (props) => {
  const { user } = props;

  const { roomId } = useParams();

  const router = useRouter();
  const { toast } = useToast();

  useRoomNotifications();

  const { fetchData } = useApiFetch<LeaveRoomApiResponse>('/rooms/leave');

  useEffect(() => {
    socketActions.initializeSocket();
    meActions.setMe(user);
    // Send a socket to request the current canvas state.
    const payload: RequestCanvasStateSocketPayload = {
      roomId: roomId as string,
      userId: user.userId,
    };

    socketState.socket?.emit('request_canvas_state', payload);

    socketState.socket?.on('update_room', (data: UpdateRoomSocketPayload) => {
      const { room } = data;
      roomActions.setRoom(room);
    });

    socketState.socket?.on('kick_request', async () => {
      const { room } = roomState;
      const { me } = meState;

      if (!room || !me) return;

      const response = await fetchData({
        method: 'POST',
        body: JSON.stringify({
          roomId: room.roomId,
          userId: me.userId,
        }),
      });

      if (!response) return;

      socketState.socket?.disconnect();

      router.push('/');
    });

    socketState.socket?.on('room_deleted', async () => {
      const { room } = roomState;
      const { me } = meState;
      if (!room || !me) return;

      const response = await fetchData({
        method: 'POST',
        body: JSON.stringify({
          roomId: room.roomId,
          userId: me.userId,
        }),
      });

      if (!response) return;

      socketState.socket?.disconnect();

      toast({ variant: 'info', content: 'Room has been deleted!' });
      router.push('/');
    });

    return () => {
      socketState.socket?.off('request_canvas_state');
      socketState.socket?.off('update_room');
      socketState.socket?.off('room_deleted');
      socketState.socket?.off('kick_request');
    };
  }, [user, roomId]);

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
