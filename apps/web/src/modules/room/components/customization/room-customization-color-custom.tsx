'use client';

import { Input } from '@modules/ui/components/forms/input';
import { Label } from '@modules/ui/components/label/label';
import React from 'react';

const RoomCustomizationColorCustom: React.FC = () => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <Label>Select</Label>
      <Input type="color" />
    </div>
  );
};

export default RoomCustomizationColorCustom;
