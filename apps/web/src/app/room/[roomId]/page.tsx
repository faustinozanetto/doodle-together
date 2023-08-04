import React from 'react';
import Room from '@modules/room/components/room';
import { RoomProvider } from '@modules/room/context/room-context';
import { cookies } from 'next/headers';
import { getDataFromToken } from '@modules/common/lib/common.lib';
import { User } from '@doodle-together/types';

const RoomPage: React.FC = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!accessToken) return null;

  const { username, sub } = getDataFromToken(accessToken?.value);
  const user: User = {
    userId: sub,
    username,
  };

  return (
    <RoomProvider>
      <Room user={user} />
    </RoomProvider>
  );
};

export default RoomPage;
