'use client';

import React from 'react';
import JoinRoomForm, { JoinRoomFormData } from './join-room-form';

const JoinRoom: React.FC = () => {
  const handleRoomJoin = async (data: JoinRoomFormData) => {};

  return (
    <div className="bg-foreground rounded-lg shadow-lg border container max-w-md p-4 flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-50">Join Room</h1>
      <p>Unleash Your Artistic Bond. DoodleTogether - Enter a Room!</p>
      <JoinRoomForm onSubmit={handleRoomJoin} />
    </div>
  );
};

export default JoinRoom;
