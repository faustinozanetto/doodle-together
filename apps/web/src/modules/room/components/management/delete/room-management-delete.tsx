'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DeleteRoomApiResponse } from '@doodle-together/shared';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@modules/ui/components/alert-dialog/alert-dialog';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { useApiFetch } from '@modules/common/hooks/use-api-fetch';

import { roomState } from '@modules/state/room.slice';
import { meActions, meState } from '@modules/state/me.slice';
import RoomManagementTool from '../room-management-tool';
import { DeleteIcon } from '@modules/ui/components/icons/delete-icon';
import RoomManagementDeleteForm, { DeleteRoomFormData } from './room-management-delete-form';

const RoomManagementDelete: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { state, fetch } = useApiFetch<DeleteRoomApiResponse>({
    endpoint: `/rooms/${roomState.room?.id ?? ''}`,
    onDataFetched: (data) => {
      const { deleted } = data;

      if (!deleted) return;

      meActions.clearAccessToken();

      toast({ variant: 'success', content: 'Room deleted successfully!' });
      router.push('/');
    },
  });

  const handleDeleteRoom = async (data: DeleteRoomFormData) => {
    const { me, accessToken } = meState;

    if (!me) return;

    await fetch({
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const handleButtonClicked = () => {
    setDialogOpen(true);
  };

  return (
    <RoomManagementTool
      label="Delete Room"
      icon={<DeleteIcon className="stroke-current" />}
      onToolClicked={handleButtonClicked}
      variant="destructive"
    >
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Deleting the room will result in removing all current users. Keep in mind this is a irreversible event!
          </AlertDialogDescription>
          <RoomManagementDeleteForm onSubmit={handleDeleteRoom} isLoading={state.isLoading} />
        </AlertDialogContent>
      </AlertDialog>
    </RoomManagementTool>
  );
};

export default RoomManagementDelete;
