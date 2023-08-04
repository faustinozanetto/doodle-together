import React from 'react';

import Room from '@modules/room/components/room';
import { cookies } from 'next/headers';
import { getDataFromToken } from '@modules/common/lib/common.lib';
import { User } from '@doodle-together/types';
import { redirect } from 'next/navigation';

const RoomPage: React.FC = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!accessToken) return redirect('/room/join');

  const { username, sub } = getDataFromToken(accessToken?.value);
  const user: User = {
    userId: sub,
    username,
  };

  return <Room user={user} />;
};

export default RoomPage;
