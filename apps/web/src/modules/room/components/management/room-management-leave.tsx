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

import { LeaveIcon } from '@modules/ui/components/icons/leave-icon';
import RoomManagementTool from './room-management-tool';
import { useMeStore } from '@modules/state/me.slice';
import socket from '@modules/socket/lib/socket.lib';
import { useRoomStore } from '@modules/state/room.slice';

const RoomManagementLeave: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { room } = useRoomStore();
  const { me, accessToken, clearAccessToken } = useMeStore();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { fetch } = useApiFetch<LeaveRoomApiResponse>({
    endpoint: '/rooms/leave',
    onDataFetched: (data) => {
      const { left } = data;
      if (!left) return;

      clearAccessToken();
      socket.disconnect();

      toast({ variant: 'success', content: 'Room left successfully!' });
      router.push('/');
    },
  });

  const handleLeaveRoom = useCallback(async () => {
    if (!room || !me || !accessToken) return;

    await fetch({
      method: 'POST',
      data: {
        roomId: room.id,
        userId: me.id,
        roomDeleted: false,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }, [room, me, accessToken]);

  const handleButtonClicked = () => {
    setDialogOpen(true);
  };

  return (
    <RoomManagementTool
      label="Leave Room"
      icon={<LeaveIcon className="stroke-current" />}
      onToolClicked={handleButtonClicked}
      variant="destructive"
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
