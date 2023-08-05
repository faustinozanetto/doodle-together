'use client';

import React, { ChangeEvent } from 'react';
import { useRoomContext } from '@modules/room/hooks/use-room-context';
import { RoomActionType } from '@modules/room/types/room.types';
import { ColorInput } from '@modules/ui/components/forms/color-input';
import { Label } from '@modules/ui/components/label/label';

const RoomCustomizationColorCustom: React.FC = () => {
  const { dispatch } = useRoomContext();

  const handleColoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch({
      type: RoomActionType.SET_TOOL_COLOR,
      payload: { color: value },
    });
  };

  return (
    <div className="flex gap-2 items-center justify-between">
      <Label>Custom</Label>
      <ColorInput type="color" onChange={handleColoChange} />
    </div>
  );
};

export default RoomCustomizationColorCustom;
