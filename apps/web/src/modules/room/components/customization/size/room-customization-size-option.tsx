'use client';

import React from 'react';

import { IconButton } from '@modules/ui/components/icon-button/icon-button';
import { CanvasShapeSize, useCanvasCustomization } from '@doodle-together/canvas-renderer';

export type RoomCustomizationSizeOptionProps = {
  icon: React.ReactNode;
  size: CanvasShapeSize;
};

const RoomCustomizationSizeOption: React.FC<RoomCustomizationSizeOptionProps> = (props) => {
  const { size, icon } = props;

  const { setSize, getSelectedNodeCustomization } = useCanvasCustomization();

  const handleSelectSize = () => {
    setSize(size);
  };

  return (
    <IconButton
      aria-label={`${size} Size`}
      variant={getSelectedNodeCustomization().size === size ? 'default' : 'ghost'}
      onClick={handleSelectSize}
      icon={icon}
    />
  );
};

export default RoomCustomizationSizeOption;
