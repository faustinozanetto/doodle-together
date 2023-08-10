import React from 'react';
import RoomCustomizationSection from '../room-customization-section';
import RoomCustomizationBackgroundEnableGrid from './room-customization-background-enable-grid';
import RoomCustomizationBackgroundGridSize from './room-customization-background-grid-size';

const RoomCustomizationBackground: React.FC = () => {
  return (
    <RoomCustomizationSection name="Background">
      <div className="flex flex-col gap-2">
        <RoomCustomizationBackgroundEnableGrid />
        <RoomCustomizationBackgroundGridSize />
      </div>
    </RoomCustomizationSection>
  );
};

export default RoomCustomizationBackground;
