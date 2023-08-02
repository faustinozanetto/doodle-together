'use client';

import React from 'react';
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
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';
import { LeaveRoomApiResponse } from '@doodle-together/types';
import { iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';

const RoomManagementLeave: React.FC = () => {
  const router = useRouter();

  const currentState = useSnapshot(state);
  const { fetchData } = useApiFetch<LeaveRoomApiResponse>('/rooms/leave');

  const { toast } = useToast();

  const handleLeaveRoom = async () => {
    await fetchData({
      method: 'POST',
      body: JSON.stringify({
        roomId: currentState.room?.roomId,
        userId: currentState.me?.userId,
      }),
    });

    actions.leaveRoom();

    toast({ variant: 'success', content: 'Room left successfully!' });
    router.replace('/');
  };

  return (
    <div
      style={{
        pointerEvents: 'all',
      }}
    >
      <AlertDialog>
        <AlertDialogTrigger aria-label="Leave Room" className={iconButtonVariants({ variant: 'danger-solid' })}>
          <svg
            className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M7 12h14l-3 -3m0 6l3 -3" />
          </svg>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to leave the room?. Are you sure you want to leave it?.
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

export default RoomManagementLeave;
