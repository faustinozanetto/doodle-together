import React from 'react';

import Room from '@modules/room/components/room';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDataFromToken } from '@modules/common/lib/common.lib';
import { User } from '@doodle-together/database';
import { siteConfig } from '@config/config';

type RoomPageProps = {
  params: {
    roomId: string;
  };
};

const RoomPage: React.FC<RoomPageProps> = async (props) => {
  const { params } = props;
  const reqCookies = cookies();
  const authCookie = reqCookies.get('auth-cookie');

  if (!authCookie) {
    const joinRoomURL = new URL('/room/join', siteConfig.url);
    joinRoomURL.searchParams.append('roomId', params.roomId);
    return redirect(joinRoomURL.toString());
  }

  const { sub: userId, roomId, username } = getDataFromToken(authCookie.value);

  const user: User = {
    id: userId,
    username,
    roomId,
  };

  return <Room user={user} />;
};

export default RoomPage;
