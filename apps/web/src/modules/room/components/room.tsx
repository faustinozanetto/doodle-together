import React from 'react';
import RoomTools from './tools/room-tools';
import RoomCanvas from './canvas/room-canvas';

import RoomCustomization from './customization/room-customization';
import RoomUsers from './users/room-users';

const Room: React.FC = () => {
  return (
    <div className="fixed bottom-0 right-0 left-0 top-20 overflow-hidden">
      <RoomCanvas />

      {/* Panels */}
      <div className="pointer-events-none absolute inset-0 p-2 flex flex-col justify-between select-none overflow-clip">
        {/* Top */}
        <div className="flex justify-between">
          <RoomUsers />
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
