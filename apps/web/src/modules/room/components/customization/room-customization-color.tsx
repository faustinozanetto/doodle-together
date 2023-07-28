'use client';

import React from 'react';
import RoomCustomizationColorPreselected from './room-customization-color-preselected';
import RoomCustomizationColorCustom from './room-customization-color-custom';

const RoomCustomizationColor: React.FC = () => {
  return (
    <div className="flex flex-col">
      <span className="font-bold border-b mb-1">Color</span>
      {/* Preselected */}
      <RoomCustomizationColorPreselected />
      <div className="border-b my-2" />
      {/* Custom */}
      <RoomCustomizationColorCustom />
    </div>
  );
};

export default RoomCustomizationColor;
