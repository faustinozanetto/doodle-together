import React from 'react';
import RoomTools from './tools/room-tools';
import RoomCanvas from './canvas/room-canvas';

import RoomCustomization from './customization/room-customization';

const Room: React.FC = () => {
  return (
    <div className="fixed bottom-0 right-0 left-0 top-20 overflow-hidden">
      <RoomCanvas />

      <div className="absolute right-2 top-2">
        <RoomCustomization />
      </div>

      <div className="absolute bottom-2 -translate-x-1/2 left-1/2">
        <RoomTools />
      </div>
    </div>
  );
};

export default Room;
