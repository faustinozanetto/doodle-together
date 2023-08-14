import React from 'react';

import axios from 'axios';
import Room from '@modules/room/components/room';
import { notFound } from 'next/navigation';

import { GetRoomApiResponse } from '@doodle-together/shared';

type RoomPageProps = {
  params: {
    roomId: string;
  };
};

const RoomPage: React.FC<RoomPageProps> = async (props) => {
  const { params } = props;

  try {
    const url = new URL(`/api/rooms/${params.roomId}`, `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}`);
    const { data } = await axios.get<GetRoomApiResponse>(url.toString(), { withCredentials: true });

    return <Room room={data.room} />;
  } catch (err) {
    return notFound();
  }
};

export default RoomPage;
