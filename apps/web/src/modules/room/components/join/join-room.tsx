'use client';

import React, { useTransition } from 'react';
import JoinRoomForm, { JoinRoomFormData } from './join-room-form';
import Link from 'next/link';
import { buttonVariants } from '@modules/ui/components/button/button';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { actions } from '@modules/state/store';
import { JoinRoomApiResponse } from '@doodle-together/types';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';

const JoinRoom: React.FC = () => {
  const router = useRouter();

  const { toast } = useToast();
  const { fetchData } = useApiFetch<JoinRoomApiResponse>('/rooms/join');

  const [isPending, startTransition] = useTransition();

  const handleRoomJoin = (formData: JoinRoomFormData) => {
    startTransition(async () => {
      const response = await fetchData({
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (!response) return;

      const { room, me } = response;

      actions.setRoom(room);
      actions.setMe(me);
      actions.setIsLoading(true);
      actions.setupSocket();

      toast({ variant: 'success', content: 'Room joined successfully!' });
      router.replace(`/room/${room.roomId}`);
    });
  };

  return (
    <div className="bg-foreground rounded-lg shadow-lg border p-6 flex flex-col gap-2 w-[95vw] max-w-[400px]">
      <div className="flex space-y-2 flex-col">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">Join Room</h1>
        <p className="text-sm">Unleash Your Artistic Bond. Doodle Together - Enter a Room!</p>
      </div>
      <JoinRoomForm onSubmit={handleRoomJoin} isPending={isPending} />
      {/* Create Room */}
      <div className="flex flex-col gap-2 text-center">
        <span className="text-xs font-semibold">OR</span>
        <Link href="/room/create" className={buttonVariants({ variant: 'outline' })}>
          Create Room
        </Link>
      </div>
    </div>
  );
};

export default JoinRoom;
