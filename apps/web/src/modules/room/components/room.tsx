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
  User,
  UserJoinedSocketPayload,
  UserLeftSocketPayload,
} from '@doodle-together/types';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import { useRouter } from 'next/navigation';
import RoomManagement from './management/room-management';
import { useRoomNotifications } from '../hooks/use-room-notifications';
import { useRoomStore } from '@modules/state/room.slice';
import { useMeStore } from '@modules/state/me.slice';
import { useSocketStore } from '@modules/state/socket.slice';

type RoomProps = {
  roomId: string;
  user: User;
};

const Room: React.FC<RoomProps> = (props) => {
  const { roomId, user } = props;

  const { room, setRoom, resetRoom } = useRoomStore();
  const { me, setMe, resetMe } = useMeStore();
  const { socket, resetSocket } = useSocketStore();
  const router = useRouter();
  const { toast } = useToast();

  useRoomNotifications();

  const { fetchData } = useApiFetch<LeaveRoomApiResponse>('/rooms/leave');

  useEffect(() => {
    setMe(user);
  }, []);

  useEffect(() => {
    // Send a socket to request the current canvas state.
    const payload: RequestCanvasStateSocketPayload = {
      roomId: roomId,
      userId: user.userId,
    };

    socket?.emit('request_canvas_state', payload);

    // User joined socket listenting
    socket?.on('user_joined', (data: UserJoinedSocketPayload) => {
      const { room } = data;
      console.log(`User Joined ${JSON.stringify(room)}`);

      setRoom(room);
    });

    socket?.on('user_left', (data: UserLeftSocketPayload) => {
      const { room } = data;
      console.log(`User left ${JSON.stringify(room)}`);

      setRoom(room);
    });

    socket?.on('kick_request', async () => {
      console.log({ room, me });

      if (!room || !me) return;

      const response = await fetchData({
        method: 'POST',
        body: JSON.stringify({
          roomId: room.roomId,
          userId: me.userId,
        }),
      });

      if (!response) return;

      socket?.disconnect();
      resetMe();
      resetRoom();
      resetSocket();

      toast({ variant: 'info', content: 'You have been kicked from the room!' });
      router.push('/');
    });

    socket?.on('room_deleted', async () => {
      console.log('delete room');

      if (!room || !me) return;

      const response = await fetchData({
        method: 'POST',
        body: JSON.stringify({
          roomId: room.roomId,
          userId: me.userId,
        }),
      });

      if (!response) return;

      socket?.disconnect();
      resetMe();
      resetRoom();
      resetSocket();

      toast({ variant: 'info', content: 'Room has been deleted!' });
      router.push('/');
    });

    return () => {
      socket?.off('request_canvas_state');
      socket?.off('user_joined');
      socket?.off('user_left');
      socket?.off('user_left');
      socket?.off('room_deleted');
      socket?.off('kick_request');
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
