import React from 'react';

import { meState } from '@modules/state/me.slice';
import { useSnapshot } from 'valtio';
import { useIsRoomOwner } from '@modules/room/hooks/use-is-room-owner';
import RoomManagementUsers from './users/room-management-users';
import RoomManagementLeave from './room-management-leave';

const RoomManagement: React.FC = () => {
  const meSnapshot = useSnapshot(meState);

  const { isRoomOwner } = useIsRoomOwner(meSnapshot.me);

  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border space-x-2 flex pointer-events-auto">
      {isRoomOwner && <RoomManagementUsers />}
      <RoomManagementLeave />
    </div>
  );
};

export default RoomManagement;
