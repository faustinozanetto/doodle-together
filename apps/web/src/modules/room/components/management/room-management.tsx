import React from 'react';
import { useSnapshot } from 'valtio';
import { state } from '@modules/state/store';
import RoomManagementLeave from './room-management-leave';
import RoomManagementUsers from './users/room-management-users';

const RoomManagement: React.FC = () => {
  const currentState = useSnapshot(state);

  const isOwner = currentState.me && currentState.room && currentState.me.userId === currentState.room.ownerId;

  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border space-x-2 flex pointer-events-auto">
      {isOwner && <RoomManagementUsers />}
      <RoomManagementLeave />
    </div>
  );
};

export default RoomManagement;
