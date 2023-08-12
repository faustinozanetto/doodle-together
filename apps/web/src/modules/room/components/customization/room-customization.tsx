'use client';

import React from 'react';
import RoomCustomizationSize from './size/room-customization-size';
import RoomCustomizationStyle from './style/room-customization-style';
import RoomCustomizationColor from './color/room-customization-color';
import RoomCustomizationBackground from './background/room-customization-background';
import RoomPanel from '../room-panel';

const RoomCustomization: React.FC = () => {
  return (
    <RoomPanel label="Customization">
      <RoomCustomizationColor />
      <RoomCustomizationSize />
      <RoomCustomizationStyle />
      <RoomCustomizationBackground />
    </RoomPanel>
  );
};

export default RoomCustomization;
