import React from 'react';

import { useSnapshot } from 'valtio';
import { meState } from '@modules/state/me.slice';
import { useIsRoomOwner } from '@modules/room/hooks/use-is-room-owner';
import RoomManagementUsers from './users/room-management-users';
import RoomManagementLeave from './room-management-leave';
import RoomManagementShareLink from './link/room-management-share-link';
import RoomManagementShareQR from './qr/room-management-share-qr';
import RoomManagementDelete from './delete/room-management-delete';
import { Separator } from '@modules/ui/components/separator/separator';
import RoomPanel from '../room-panel';

const RoomManagement: React.FC = () => {
  const meSnapshot = useSnapshot(meState);

  const { isRoomOwner } = useIsRoomOwner(meSnapshot.me);

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
