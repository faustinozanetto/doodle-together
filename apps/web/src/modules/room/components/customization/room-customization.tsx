'use client';

import React from 'react';
import RoomCustomizationSize from './size/room-customization-size';
import RoomCustomizationStyle from './style/room-customization-style';
import RoomCustomizationColor from './color/room-customization-color';
import RoomCustomizationBackground from './background/room-customization-background';

const RoomCustomization: React.FC = () => {
  return (
    <div className="bg-background p-2 rounded-lg shadow-lg border pointer-events-auto gap-2 flex flex-col">
      <RoomCustomizationColor />
      <RoomCustomizationSize />
      <RoomCustomizationStyle />
      <RoomCustomizationBackground />
    </div>
  );
};

export default RoomCustomization;
