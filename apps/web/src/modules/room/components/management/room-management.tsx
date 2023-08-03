import React from 'react';

import RoomManagementLeave from './room-management-leave';
import RoomManagementUsers from './users/room-management-users';
import { useMeStore } from '@modules/state/me.slice';
import { useRoomStore } from '@modules/state/room.slice';

const RoomManagement: React.FC = () => {
  const { me } = useMeStore();
  const { room } = useRoomStore();

  const isOwner = me && room && me.userId === room.ownerId;

  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border space-x-2 flex pointer-events-auto">
      {isOwner && <RoomManagementUsers />}
      <RoomManagementLeave />
    </div>
  );
};

export default RoomManagement;
