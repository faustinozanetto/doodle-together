'use client';

import React from 'react';
import JoinRoomForm, { JoinRoomFormData } from './join-room-form';
import Link from 'next/link';
import { buttonVariants } from '@modules/ui/components/button/button';

const JoinRoom: React.FC = () => {
  const handleRoomJoin = async (data: JoinRoomFormData) => {};

  return (
    <div className="bg-foreground rounded-lg shadow-lg border p-6 flex flex-col gap-2 w-[95vw] max-w-[400px]">
      <div className="flex space-y-2 flex-col mb-4">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">Join Room</h1>
        <p className="text-sm">Unleash Your Artistic Bond. Doodle Together - Enter a Room!</p>
      </div>
      <JoinRoomForm onSubmit={handleRoomJoin} />
      {/* Create Room */}
      <div className="flex flex-col gap-2 text-center">
        <span className="text-xs font-semibold">OR</span>
        <Link href="/create" className={buttonVariants({ variant: 'outline' })}>
          Create Room
        </Link>
      </div>
    </div>
  );
};

export default JoinRoom;
