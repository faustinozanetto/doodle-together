'use client';

import React, { ChangeEvent } from 'react';
import { ColorInput } from '@modules/ui/components/forms/color-input';
import { Label } from '@modules/ui/components/label/label';
import { useCanvasCustomization } from '@doodle-together/canvas-renderer';

const RoomCustomizationColorCustom: React.FC = () => {
  const { setColor } = useCanvasCustomization();

  const handleColoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setColor(value);
  };

  return (
    <div className="flex gap-2 items-center justify-between">
      <Label>Custom</Label>
      <ColorInput type="color" onChange={handleColoChange} />
    </div>
  );
};

export default RoomCustomizationColorCustom;
