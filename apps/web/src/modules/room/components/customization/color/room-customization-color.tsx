import React from 'react';
import RoomCustomizationColorPreselected from './room-customization-color-preselected';
import RoomCustomizationColorCustom from './room-customization-color-custom';
import RoomCustomizationSection from '../room-customization-section';

const RoomCustomizationColor: React.FC = () => {
  return (
    <RoomCustomizationSection name="Color">
      {/* Preselected */}
      <RoomCustomizationColorPreselected />
      {/* Custom */}
      <RoomCustomizationColorCustom />
    </RoomCustomizationSection>
  );
};

export default RoomCustomizationColor;
