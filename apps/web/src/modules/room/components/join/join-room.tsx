'use client';

import React from 'react';
import JoinRoomForm, { JoinRoomFormData } from './join-room-form';
import Link from 'next/link';
import { buttonVariants } from '@modules/ui/components/button/button';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';

const JoinRoom: React.FC = () => {
  const { toast } = useToast();

  const handleRoomJoin = async (data: JoinRoomFormData) => {
    const response = await fetch('/api/room/join', { method: 'POST', body: JSON.stringify(data) });

    if (!response.ok) {
      toast({ variant: 'danger', content: 'Could not join room!' });
      return;
    }

    const responseData = await response.json();
    toast({ variant: 'success', content: 'Room joined successfully!' });
  };

  return (
    <div className="bg-foreground rounded-lg shadow-lg border p-6 flex flex-col gap-2 w-[95vw] max-w-[400px]">
      <div className="flex space-y-2 flex-col">
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
