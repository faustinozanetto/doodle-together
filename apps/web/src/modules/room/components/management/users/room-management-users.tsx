'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@modules/ui/components/dialog';
import { iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';
import RoomManagementUser from './room-management-user';
import { useRoomUsers } from '@modules/room/hooks/use-room-users';

const RoomManagementUsers: React.FC = () => {
  const { users } = useRoomUsers({ sortUsers: true });

  return (
    <div
      style={{
        pointerEvents: 'all',
      }}
    >
      <Dialog>
        <DialogTrigger aria-label="Manage Users" className={iconButtonVariants({ variant: 'secondary' })}>
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
            <circle cx="9" cy="7" r="4" />
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
          </svg>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Manage Room Users</DialogTitle>
            <DialogDescription>Here you can view the currently connected users and manage them.</DialogDescription>
          </DialogHeader>
          {users.map((user) => {
            return <RoomManagementUser key={`users-management-${user.userId}`} user={user} />;
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomManagementUsers;
