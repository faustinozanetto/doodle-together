'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreateRoomApiResponse } from '@doodle-together/shared';
import { buttonVariants } from '@modules/ui/components/button/button';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';

import { useApiFetch } from '@modules/common/hooks/use-api-fetch';

import CreateRoomForm, { CreateRoomFormData } from './create-room-form';
import { useMeStore } from '@modules/state/me.slice';
import { useRoomStore } from '@modules/state/room.slice';

const CreateRoom: React.FC = () => {
  const router = useRouter();

  const { toast } = useToast();
  const { setRoom } = useRoomStore();
  const { setMe, setAccessToken } = useMeStore();

  const { state, fetch } = useApiFetch<CreateRoomApiResponse>({
    endpoint: '/rooms/create',
    onDataFetched: (data) => {
      const { room, user, accessToken } = data;

      setRoom(room);
      setMe(user);
      setAccessToken(accessToken);

      toast({ variant: 'success', content: 'Room created successfully!' });
      router.push(`/room/${room.id}`);
    },
  });

  const handleRoomCreate = async (formData: CreateRoomFormData) => {
    await fetch({
      method: 'POST',
      data: {
        ...formData,
      },
    });
  };

  return (
    <div className="rounded-lg shadow-lg border p-6 flex flex-col gap-2 w-[95vw] max-w-[400px]">
      <div className="flex space-y-2 flex-col">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">Create Room</h1>
        <p className="text-sm">Unleash Your Artistic Bond. Doodle Together - Create a Room!</p>
      </div>
      <CreateRoomForm onSubmit={handleRoomCreate} isLoading={state.isLoading} />
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
