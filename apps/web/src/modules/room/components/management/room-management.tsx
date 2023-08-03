import React from 'react';

import RoomManagementLeave from './room-management-leave';
import RoomManagementUsers from './users/room-management-users';
import { useRoomOwner } from '@modules/room/hooks/use-room-owner';
import { useRoomMe } from '@modules/room/hooks/use-room-me';

const RoomManagement: React.FC = () => {
  const me = useRoomMe();
  const owner = useRoomOwner();

  const isOwner = me && owner && me.userId === owner.userId;

  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border space-x-2 flex pointer-events-auto">
      {isOwner && <RoomManagementUsers />}
      <RoomManagementLeave />
    </div>
  );
};

export default RoomManagement;
