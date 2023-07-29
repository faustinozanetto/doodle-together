'use client';

import React, { useEffect } from 'react';
import RoomTools from './tools/room-tools';
import RoomCanvas from './canvas/room-canvas';

import RoomCustomization from './customization/room-customization';
import RoomUsers from './users/room-users';
import { useRoomContext } from '../hooks/use-room-context';
import { RoomActionType } from '../types/room.types';
import { actions, state } from '@modules/state/store';
import { useSnapshot } from 'valtio';

type RoomProps = {
  roomId: string;
};

const Room: React.FC<RoomProps> = (props) => {
  const { roomId } = props;

  const currentState = useSnapshot(state);

  return (
    <div className="fixed bottom-0 right-0 left-0 top-20 overflow-hidden">
      <RoomCanvas />

      {/* Panels */}
      <div className="pointer-events-none absolute inset-0 p-2 flex flex-col justify-between select-none overflow-clip">
        {/* Top */}
        <div className="flex justify-between">
          <RoomUsers users={currentState.room?.users} />
          <RoomCustomization />
        </div>

        {/* Bottom  */}
        <div className="flex">
          <RoomTools />
        </div>
      </div>
    </div>
  );
};

export default Room;
