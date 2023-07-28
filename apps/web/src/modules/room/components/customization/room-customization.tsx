'use client';

import React from 'react';
import RoomCustomizationColor from './room-customization-color';
import RoomCustomizationSize from './room-customization-size';
import RoomCustomizationStyle from './room-customization-style';

const RoomCustomization: React.FC = () => {
  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border pointer-events-auto">
      <RoomCustomizationColor />
      <RoomCustomizationSize />
      <RoomCustomizationStyle />
    </div>
  );
};

export default RoomCustomization;
