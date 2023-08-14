import React from 'react';
import CreateRoom from '@modules/room/components/create/create-room';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Room',
};

const CreateRoomPage: React.FC = () => {
  return <CreateRoom />;
};

export default CreateRoomPage;
