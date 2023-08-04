import React from 'react';

import Room from '@modules/room/components/room';
import { cookies } from 'next/headers';
import { getDataFromToken } from '@modules/common/lib/common.lib';
import { User } from '@doodle-together/types';
import { redirect } from 'next/navigation';

type RoomPageProps = {
  params: {
    roomId: string;
  };
};

const RoomPage: React.FC<RoomPageProps> = async (props) => {
  const { params } = props;
  const { roomId } = params;

  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!accessToken) return redirect(`/room/join?roomId=${roomId}`);

  const { username, sub } = getDataFromToken(accessToken?.value);
  const user: User = {
    userId: sub,
    username,
  };

  return <Room user={user} />;
};

export default RoomPage;
