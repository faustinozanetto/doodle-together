'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { JoinRoomApiResponse } from '@doodle-together/shared';
import { buttonVariants } from '@modules/ui/components/button/button';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';

import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import JoinRoomForm, { JoinRoomFormData } from './join-room-form';
import { useMeStore } from '@modules/state/me.slice';
import { useRoomStore } from '@modules/state/room.slice';

const JoinRoom: React.FC = () => {
  const router = useRouter();

  const { setRoom } = useRoomStore();
  const { setMe, setAccessToken } = useMeStore();
  const { toast } = useToast();

  const { state, fetch } = useApiFetch<JoinRoomApiResponse>({
    endpoint: '/rooms/join',
    onDataFetched: (data) => {
      const { room, accessToken, user } = data;

      setRoom(room);
      setMe(user);
      setAccessToken(accessToken);

      toast({ variant: 'success', content: 'Room joined successfully!' });
      router.push(`/room/${room.id}`);
    },
  });

  const handleRoomJoin = async (formData: JoinRoomFormData) => {
    await fetch({
      method: 'POST',
      data: { ...formData },
    });
  };

  return (
    <div className="rounded-lg shadow-lg border p-6 flex flex-col gap-2 w-[95vw] max-w-[400px]">
      <div className="flex space-y-2 flex-col">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">Join Room</h1>
        <p className="text-sm text-muted-foreground">Unleash Your Artistic Bond. Doodle Together - Enter a Room!</p>
      </div>
      <JoinRoomForm onSubmit={handleRoomJoin} isLoading={state.isLoading} />
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
