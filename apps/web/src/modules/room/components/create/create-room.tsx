'use client';

import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@modules/ui/components/button/button';
import CreateRoomForm, { CreateRoomFormData } from './create-room-form';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';

const CreateRoom: React.FC = () => {
  const { toast } = useToast();

  const handleRoomCreate = async (data: CreateRoomFormData) => {
    const response = await fetch('/api/room/create', { method: 'POST', body: JSON.stringify(data) });

    if (!response.ok) {
      toast({ variant: 'danger', content: 'Could not create room!' });
      return;
    }

    const responseData = await response.json();
    toast({ variant: 'success', content: 'Room created successfully!' });
  };

  return (
    <div className="bg-foreground rounded-lg shadow-lg border p-6 flex flex-col gap-2 w-[95vw] max-w-[400px]">
      <div className="flex space-y-2 flex-col">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">Create Room</h1>
        <p className="text-sm">Unleash Your Artistic Bond. Doodle Together - Create a Room!</p>
      </div>
      <CreateRoomForm onSubmit={handleRoomCreate} />
      {/* Join Room */}
      <div className="flex flex-col gap-2 text-center">
        <span className="text-xs font-semibold">OR</span>
        <Link href="/join" className={buttonVariants({ variant: 'outline' })}>
          Join Room
        </Link>
      </div>
    </div>
  );
};

export default CreateRoom;
