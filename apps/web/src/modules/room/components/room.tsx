'use client';

import React, { useEffect } from 'react';
import RoomTools from './tools/room-tools';
import RoomCanvas from './canvas/room-canvas';

import RoomCustomization from './customization/room-customization';
import RoomUsers from './users/room-users';
import { actions, state } from '@modules/state/store';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { LeaveRoomApiResponse, UserJoinedSocketPayload, UserLeftSocketPayload } from '@doodle-together/types';
import RoomLeave from './leave/room-leave';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import { useRouter } from 'next/navigation';

type RoomProps = {
  roomId: string;
};

const Room: React.FC<RoomProps> = (props) => {
  const { roomId } = props;

  const router = useRouter();

  const { toast } = useToast();

  const { fetchData } = useApiFetch<LeaveRoomApiResponse>('/rooms/leave');

  useEffect(() => {
    state.socket?.on('user_joined', (data: UserJoinedSocketPayload) => {
      const { user, room } = data;

      actions.setRoom(room);

      // Notify other users that user joined
      if (state.me?.userId === user.userId) return;
      toast({ variant: 'info', content: `User ${user.username} joined the room!` });
    });

    state.socket?.on('user_left', (data: UserLeftSocketPayload) => {
      const { user, room } = data;

      actions.setRoom(room);

      // Notify other users that user left
      if (state.me?.userId === user.userId) return;
      toast({ variant: 'info', content: `User ${user.username} left the room!` });
    });

    state.socket?.on('room_deleted', async (data) => {
      const { room } = data;

      const response = await fetchData({
        method: 'POST',
        body: JSON.stringify({
          roomId: room.roomId,
          userId: state.me?.userId,
          removeUser: false,
        }),
      });

      if (!response) return;

      actions.leaveRoom();

      toast({ variant: 'info', content: 'Room has been deleted!' });
      router.push('/');
    });

    return () => {
      state.socket?.off('user_joined');
      state.socket?.off('user_left');
      state.socket?.off('room_deleted');
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

          <RoomLeave />
        </div>
      </div>
    </div>
  );
};

export default Room;
