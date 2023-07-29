'use client';

import React, { useContext, useTransition } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@modules/ui/components/button/button';
import CreateRoomForm, { CreateRoomFormData } from './create-room-form';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { ApiResponseData } from '@modules/common/types/common.types';
import { CreateRoomApiResponse } from '@modules/room/types/room.types';
import { SocketContext } from '@modules/socket/context/socket.context';
import { useRouter } from 'next/navigation';

const CreateRoom: React.FC = () => {
  const router = useRouter();

  const { toast } = useToast();
  const { socket } = useContext(SocketContext);

  const [isPending, startTransition] = useTransition();

  const handleRoomCreate = (formData: CreateRoomFormData) => {
    if (!socket) return;

    startTransition(async () => {
      const response = await fetch('/api/room/create', { method: 'POST', body: JSON.stringify(formData) });

      const data: ApiResponseData<CreateRoomApiResponse> = await response.json();

      if (!response.ok || !('data' in data)) {
        let content = 'Could not join room!';
        if ('message' in data) content = data.message;

        toast({ variant: 'danger', content });
        return;
      }

      const { data: responseData } = data;

      toast({ variant: 'success', content: 'Room created successfully!' });

      router.push(`/room/${responseData.room.roomId}`);
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
