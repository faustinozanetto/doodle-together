import React from 'react';

import RoomManagementLeave from './room-management-leave';
import RoomManagementUsers from './users/room-management-users';
import { meState } from '@modules/state/me.slice';
import { useSnapshot } from 'valtio';
import { roomState } from '@modules/state/room.slice';

const RoomManagement: React.FC = () => {
  const meSnapshot = useSnapshot(meState);
  const roomSnapshot = useSnapshot(roomState);

  const isOwner =
    meSnapshot &&
    meSnapshot.me &&
    roomSnapshot &&
    roomSnapshot.room &&
    meSnapshot.me.userId === roomSnapshot.room.ownerId;

  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border space-x-2 flex pointer-events-auto">
      {isOwner && <RoomManagementUsers />}
      <RoomManagementLeave />
    </div>
  );
};

export default RoomManagement;
