import React from 'react';
import JoinRoom from '@modules/room/components/join/join-room';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join Room',
};

const JoinRoomPage: React.FC = () => {
  return <JoinRoom />;
};

export default JoinRoomPage;
