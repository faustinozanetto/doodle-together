'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@modules/ui/components/dialog';
import { useRoomUsers } from '@modules/room/hooks/use-room-users';
import { UsersIcon } from '@modules/ui/components/icons/users-icon';
import RoomManagementUser from './room-management-user';
import RoomManagementTool from '../room-management-tool';

const RoomManagementUsers: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { users } = useRoomUsers({ sortUsers: true });

  const handleToolClicked = () => {
    setModalOpen(true);
  };

  return (
    <RoomManagementTool
      label="Room Users"
      variant="default"
      icon={<UsersIcon className="stroke-current" />}
      onToolClicked={handleToolClicked}
    >
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Manage Room Users</DialogTitle>
            <DialogDescription>Here you can view the currently connected users and manage them.</DialogDescription>
          </DialogHeader>
          {users.map((user) => {
            return <RoomManagementUser key={`users-management-${user.id}`} user={user} />;
          })}
        </DialogContent>
      </Dialog>
    </RoomManagementTool>
  );
};

export default RoomManagementUsers;
