import { SocketNames, LeaveRoomApiResponse } from '@doodle-together/shared';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import socket from '@modules/socket/lib/socket.lib';
import { useMeStore } from '@modules/state/me.slice';
import { useRoomStore } from '@modules/state/room.slice';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useKickRequestRoomSocket = () => {
  const router = useRouter();
  const { me, accessToken, clearAccessToken } = useMeStore();
  const { room } = useRoomStore();

  const { fetch } = useApiFetch<LeaveRoomApiResponse>({
    endpoint: '/rooms/leave',
    onDataFetched: (data) => {
      const { left } = data;
      if (!left) return;

      clearAccessToken();
      socket.disconnect();
      router.push('/');
    },
  });

  useEffect(() => {
    socket.on(SocketNames.KICK_REQUEST, async () => {
      if (!room || !me || !accessToken) return;

      await fetch({
        method: 'POST',
        data: {
          roomId: room.id,
          userId: me.id,
          roomDeleted: false,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });

    return () => {
      socket.off(SocketNames.KICK_REQUEST);
    };
  }, [me, room, accessToken]);
};
