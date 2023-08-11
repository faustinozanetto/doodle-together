import { SocketNames, LeaveRoomApiResponse } from '@doodle-together/shared';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import { meState } from '@modules/state/me.slice';
import { roomState } from '@modules/state/room.slice';
import { socketState } from '@modules/state/socket.slice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useDeleteRoomSocket = () => {
  const router = useRouter();

  const { fetch } = useApiFetch<LeaveRoomApiResponse>({
    endpoint: '/rooms/leave',
    onDataFetched: (data) => {
      const { left } = data;
      if (!left) return;

      socketState.socket?.disconnect();
      router.push('/');
    },
  });

  useEffect(() => {
    socketState.socket?.on(SocketNames.DELETE_ROOM, async () => {
      const { room } = roomState;
      const { me } = meState;

      if (!room || !me) return;

      await fetch({
        method: 'POST',
        data: {
          roomId: room.id,
          userId: me.id,
          roomDeleted: true,
        },
      });
    });

    return () => {
      socketState.socket?.off(SocketNames.DELETE_ROOM);
    };
  }, [roomState, meState]);
};
