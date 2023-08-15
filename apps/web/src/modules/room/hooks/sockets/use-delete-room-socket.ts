import { SocketNames, LeaveRoomApiResponse } from '@doodle-together/shared';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import socket from '@modules/socket/lib/socket.lib';
import { useMeStore } from '@modules/state/me.slice';
import { useRoomStore } from '@modules/state/room.slice';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useDeleteRoomSocket = () => {
  const router = useRouter();
  const { me, accessToken } = useMeStore();
  const { room } = useRoomStore();

  const { fetch } = useApiFetch<LeaveRoomApiResponse>({
    endpoint: '/rooms/leave',
    onDataFetched: (data) => {
      const { left } = data;
      if (!left) return;

      socket.disconnect();
      router.push('/');
    },
  });

  useEffect(() => {
    socket.on(SocketNames.DELETE_ROOM, async () => {
      if (!room || !me || !accessToken) return;

      // Dont post to leave if is room owner.
      if (room.ownerId === me.id) return;

      await fetch({
        method: 'POST',
        data: {
          roomId: room.id,
          userId: me.id,
          roomDeleted: true,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });

    return () => {
      socket.off(SocketNames.DELETE_ROOM);
    };
  }, [me, accessToken, room]);
};
