'use client';

import React, { useEffect } from 'react';
import RoomTools from './tools/room-tools';
import RoomCanvas from './canvas/room-canvas';

import RoomCustomization from './customization/room-customization';
import RoomUsers from './users/room-users';
import { actions, state } from '@modules/state/store';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import {
  LeaveRoomApiResponse,
  RequestCanvasStateSocketPayload,
  User,
  UserJoinedSocketPayload,
  UserLeftSocketPayload,
} from '@doodle-together/types';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import { useRouter } from 'next/navigation';
import RoomManagement from './management/room-management';
import { useRoomNotifications } from '../hooks/use-room-notifications';

type RoomProps = {
  roomId: string;
  user: User;
};

const Room: React.FC<RoomProps> = (props) => {
  const { roomId, user } = props;

  const router = useRouter();
  const { toast } = useToast();

  useRoomNotifications();

  const { fetchData } = useApiFetch<LeaveRoomApiResponse>('/rooms/leave');

  useEffect(() => {
    actions.setupSocket();
    actions.setMe(user);

    // Send a socket to request the current canvas state.
    const payload: RequestCanvasStateSocketPayload = {
      roomId: roomId,
      userId: user.userId,
    };

    state.socket?.emit('request_canvas_state', payload);

    // User joined socket listenting
    state.socket?.on('user_joined', (data: UserJoinedSocketPayload) => {
      const { user, room } = data;

      actions.setRoom(room);
    });

    state.socket?.on('kick_request', async () => {
      if (state.room === undefined || state.me === undefined) return;

      const response = await fetchData({
        method: 'POST',
        body: JSON.stringify({
          roomId: state.room.roomId,
          userId: state.me.userId,
        }),
      });

      if (!response) return;

      actions.leaveRoom();
      toast({ variant: 'info', content: 'You have been kicked from the room!' });
      router.push('/');
    });

    state.socket?.on('room_deleted', async () => {
      console.log('delete room');

      if (state.room === undefined || state.me === undefined) return;

      const response = await fetchData({
        method: 'POST',
        body: JSON.stringify({
          roomId: state.room.roomId,
          userId: state.me.userId,
        }),
      });

      if (!response) return;

      actions.leaveRoom();

      toast({ variant: 'info', content: 'Room has been deleted!' });
      router.push('/');
    });

    return () => {
      state.socket?.off('request_canvas_state');
      state.socket?.off('user_joined');
      state.socket?.off('user_left');
      state.socket?.off('room_deleted');
      state.socket?.off('kick_request');
    };
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
