'use client';

import React, { useTransition } from 'react';
import JoinRoomForm, { JoinRoomFormData } from './join-room-form';
import Link from 'next/link';
import { buttonVariants } from '@modules/ui/components/button/button';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { ApiResponseData } from '@modules/common/types/common.types';
import { useRouter } from 'next/navigation';

const JoinRoom: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const handleRoomJoin = (formData: JoinRoomFormData) => {
    startTransition(async () => {
      const response = await fetch('/api/room/join', { method: 'POST', body: JSON.stringify(formData) });

      const data: ApiResponseData = await response.json();

      if (!response.ok) {
        let content = 'Could not join room!';
        if ('message' in data) content = data.message;

        toast({ variant: 'danger', content });
        return;
      }

      toast({ variant: 'success', content: 'Room joined successfully!' });
      router.push(`/room/${formData.id}`);
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
