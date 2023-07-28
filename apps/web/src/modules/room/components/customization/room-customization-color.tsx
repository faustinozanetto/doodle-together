'use client';

import React from 'react';
import RoomCustomizationColorPreselected from './room-customization-color-preselected';
import RoomCustomizationColorCustom from './room-customization-color-custom';
import { Separator } from '@modules/ui/components/separator/separator';

const RoomCustomizationColor: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold">Color</span>
      <Separator />
      {/* Preselected */}
      <RoomCustomizationColorPreselected />
      {/* Custom */}
      <RoomCustomizationColorCustom />
    </div>
  );
};

export default RoomCustomizationColor;
