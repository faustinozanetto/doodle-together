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
import RoomManagementTool from '../room-management-tool';
import { DeleteIcon } from '@modules/ui/components/icons/delete-icon';
import RoomManagementDeleteForm, { DeleteRoomFormData } from './room-management-delete-form';

const RoomManagementDelete: React.FC = () => {
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { fetchData } = useApiFetch<LeaveRoomApiResponse>(`/rooms/${roomState.room?.id ?? ''}`);

  const { toast } = useToast();

  const handleDeleteRoom = async (data: DeleteRoomFormData) => {
    const { room } = roomState;
    const { me } = meState;

    if (!room || !me) return;

    await fetchData({
      method: 'DELETE',
    });

    toast({ variant: 'success', content: 'Room deleted successfully!' });
    router.replace('/');
  };

  const handleButtonClicked = () => {
    setDialogOpen(true);
  };

  return (
    <RoomManagementTool
      label="Delete Room"
      icon={<DeleteIcon />}
      onToolClicked={handleButtonClicked}
      variant="danger-solid"
    >
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Please type the room id
            <span className="font-bold bg-foreground p-1 rounded-lg border text-primary-600 dark:text-primary-400 wrap mx-1">
              {roomState.room?.id}
            </span>
            below to confirm this action. Keep in mind this is a irreversible event!
          </AlertDialogDescription>
          <RoomManagementDeleteForm onSubmit={handleDeleteRoom} />
        </AlertDialogContent>
      </AlertDialog>
    </RoomManagementTool>
  );
};

export default RoomManagementDelete;
