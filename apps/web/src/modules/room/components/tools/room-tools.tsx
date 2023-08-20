import React from 'react';
import RoomPanel from '../room-panel';
import RoomToolsShapes from './shapes/room-tools-shapes';
import RoomToolsUtilities from './utilities/room-tools-utilities';

const RoomTools: React.FC = () => {
  return (
    <RoomPanel>
      <div className="flex gap-2">
        <RoomToolsShapes />
        <RoomToolsUtilities />
      </div>
    </RoomPanel>
  );
};

export default RoomTools;
