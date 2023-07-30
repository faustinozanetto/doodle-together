'use client';

import React, { useTransition } from 'react';
import { actions, state } from '@modules/state/store';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@modules/ui/components/alert-dialog/alert-dialog';
import { buttonVariants } from '@modules/ui/components/button/button';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import { LeaveRoomApiResponse } from '@doodle-together/types';

const RoomLeave: React.FC = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const currentState = useSnapshot(state);
  const { fetchData } = useApiFetch<LeaveRoomApiResponse>('/rooms/leave');

  const { toast } = useToast();

  const handleLeaveRoom = () => {
    startTransition(async () => {
      const response = await fetchData({
        method: 'POST',
        body: JSON.stringify({
          roomId: currentState.room?.roomId,
          userId: currentState.me?.userId,
          accessToken: currentState.accessToken,
        }),
      });

      if (!response) return;

      const { left } = response;

      actions.leaveRoom();

      toast({ variant: 'success', content: 'Room left successfully!' });
      router.replace('/');
    });
  };

  return (
    <div
      style={{
        pointerEvents: 'all',
      }}
    >
      <AlertDialog>
        <AlertDialogTrigger className={buttonVariants({ variant: 'danger-solid' })}>Leave Room?</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLeaveRoom}>Leave</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RoomLeave;
