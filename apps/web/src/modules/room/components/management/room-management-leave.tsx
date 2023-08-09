'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LeaveRoomApiResponse } from '@doodle-together/shared';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@modules/ui/components/alert-dialog/alert-dialog';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';

import { roomState } from '@modules/state/room.slice';
import { meState } from '@modules/state/me.slice';
import { socketState } from '@modules/state/socket.slice';
import { LeaveIcon } from '@modules/ui/components/icons/leave-icon';
import RoomManagementTool from './room-management-tool';

const RoomManagementLeave: React.FC = () => {
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { fetchData } = useApiFetch<LeaveRoomApiResponse>('/rooms/leave');

  const { toast } = useToast();

  const handleLeaveRoom = useCallback(async () => {
    const { room } = roomState;
    const { me } = meState;

    if (!room || !me) return;

    await fetchData({
      method: 'POST',
      body: JSON.stringify({
        roomId: room.id,
        userId: me.id,
        roomDeleted: false,
      }),
    });

    socketState.socket?.disconnect();

    toast({ variant: 'success', content: 'Room left successfully!' });
    router.replace('/');
  }, [roomState.room, meState.me]);

  const handleButtonClicked = () => {
    setDialogOpen(true);
  };

  return (
    <RoomManagementTool
      label="Leave Room"
      icon={<LeaveIcon />}
      onToolClicked={handleButtonClicked}
      variant="danger-solid"
    >
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
    </RoomManagementTool>
  );
};

export default RoomManagementLeave;
