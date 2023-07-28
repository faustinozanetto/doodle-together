import React from 'react';
import RoomTools from './tools/room-tools';
import RoomCanvas from './canvas/room-canvas';
import RoomInspector from './inspector/room-inspector';

const Room: React.FC = () => {
  return (
    <div className="fixed bottom-0 right-0 left-0 top-20">
      <RoomCanvas />

      <div className="absolute right-2 top-2">
        <RoomInspector />
      </div>

      <div className="absolute bottom-2 left-1/2">
        <RoomTools />
      </div>
    </div>
  );
};

export default Room;
