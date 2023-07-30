'use client';

import React, { useTransition } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@modules/ui/components/button/button';
import CreateRoomForm, { CreateRoomFormData } from './create-room-form';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { actions } from '@modules/state/store';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import { CreateRoomApiResponse } from '@doodle-together/types';

const CreateRoom: React.FC = () => {
  const router = useRouter();

  const { toast } = useToast();
  const { fetchData } = useApiFetch<CreateRoomApiResponse>('/rooms');

  const [isPending, startTransition] = useTransition();

  const handleRoomCreate = (formData: CreateRoomFormData) => {
    startTransition(async () => {
      const response = await fetchData({
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (!response) return;

      const { accessToken, room } = response;

      actions.setAccessToken(accessToken);
      actions.setRoom(room);

      toast({ variant: 'success', content: 'Room created successfully!' });
      router.replace(`/room/${room.roomId}`);
    });
  };

  return (
    <div className="bg-foreground rounded-lg shadow-lg border p-6 flex flex-col gap-2 w-[95vw] max-w-[400px]">
      <div className="flex space-y-2 flex-col">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">Create Room</h1>
        <p className="text-sm">Unleash Your Artistic Bond. Doodle Together - Create a Room!</p>
      </div>
      <CreateRoomForm onSubmit={handleRoomCreate} isPending={isPending} />
      {/* Join Room */}
      <div className="flex flex-col gap-2 text-center">
        <span className="text-xs font-semibold">OR</span>
        <Link href="/room/join" className={buttonVariants({ variant: 'outline' })}>
          Join Room
        </Link>
      </div>
    </div>
  );
};

export default CreateRoom;
