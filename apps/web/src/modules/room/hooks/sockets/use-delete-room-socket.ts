import { SocketNames, LeaveRoomApiResponse } from '@doodle-together/shared';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import { meState } from '@modules/state/me.slice';
import { roomState } from '@modules/state/room.slice';
import { socketState } from '@modules/state/socket.slice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useDeleteRoomSocket = () => {
  const router = useRouter();

  const { fetchData } = useApiFetch<LeaveRoomApiResponse>('/rooms/leave');

  useEffect(() => {
    socketState.socket?.on(SocketNames.DELETE_ROOM, async () => {
      const { room } = roomState;
      const { me } = meState;

      if (!room || !me) return;

      const response = await fetchData({
        method: 'POST',
        body: JSON.stringify({
          roomId: room.id,
          userId: me.id,
          roomDeleted: true,
        }),
      });

      if (!response) return;

      socketState.socket?.disconnect();
      router.push('/');
    });

    return () => {
      socketState.socket?.off(SocketNames.DELETE_ROOM);
    };
  }, []);
};
