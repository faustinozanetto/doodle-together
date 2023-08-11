import React from 'react';

import axios from 'axios';
import Room from '@modules/room/components/room';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getDataFromToken } from '@modules/common/lib/common.lib';
import { User } from '@doodle-together/database';
import { siteConfig } from '@config/config';
import { GetRoomApiResponse, RoomWithUsers } from '@doodle-together/shared';

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

  let room: RoomWithUsers;
  try {
    const url = new URL(`/api/rooms/${params.roomId}`, `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}`);
    const { data } = await axios.get<GetRoomApiResponse>(url.toString(), { withCredentials: true });
    room = data.room;
  } catch (err) {
    return notFound();
  }

  return <Room user={user} room={room} />;
};

export default RoomPage;
