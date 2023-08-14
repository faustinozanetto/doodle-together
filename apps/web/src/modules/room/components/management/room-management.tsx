import React from 'react';

import { useSnapshot } from 'valtio';

import { useIsRoomOwner } from '@modules/room/hooks/use-is-room-owner';
import RoomManagementUsers from './users/room-management-users';
import RoomManagementLeave from './room-management-leave';
import RoomManagementShareLink from './link/room-management-share-link';
import RoomManagementShareQR from './qr/room-management-share-qr';
import RoomManagementDelete from './delete/room-management-delete';
import RoomPanel from '../room-panel';
import { useMeStore } from '@modules/state/me.slice';

const RoomManagement: React.FC = () => {
  const { me } = useMeStore();

  const { isRoomOwner } = useIsRoomOwner(me);

  return (
    <RoomPanel label="Management">
      <div className="flex gap-2">
        {isRoomOwner && <RoomManagementUsers />}
        <RoomManagementShareLink />
        <RoomManagementShareQR />
        {isRoomOwner && <RoomManagementDelete />}
        <RoomManagementLeave />
      </div>
    </RoomPanel>
  );
};

export default RoomManagement;
