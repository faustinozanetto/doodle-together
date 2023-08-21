'use client';

import React from 'react';

import { IconButton } from '@modules/ui/components/icon-button/icon-button';
import { CanvasShapeStyle, useCanvasCustomization } from '@doodle-together/canvas-renderer';

export type RoomCustomizationStyleOptionProps = {
  icon: React.ReactNode;
  style: CanvasShapeStyle;
};

const RoomCustomizationStyleOption: React.FC<RoomCustomizationStyleOptionProps> = (props) => {
  const { style, icon } = props;

  const { setStyle, getSelectedNodeCustomization } = useCanvasCustomization();

  const handleSelectStyle = () => {
    setStyle(style);
  };

  return (
    <IconButton
      aria-label={`${style} Style`}
      variant={getSelectedNodeCustomization().style === style ? 'default' : 'ghost'}
      onClick={handleSelectStyle}
      icon={icon}
    />
  );
};

export default RoomCustomizationStyleOption;
