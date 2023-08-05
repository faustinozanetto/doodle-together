'use client';

import React from 'react';
import { useRoomContext } from '@modules/room/hooks/use-room-context';
import { RoomActionType } from '@modules/room/types/room.types';
import { Button } from '@modules/ui/components/button/button';

const PRESELECTED_COLORS: ToolColorOptionProps[] = [
  { color: '#FFB6C1', label: 'Light Pink' },
  { color: '#FFC0CB', label: 'Pink' },
  { color: '#FFD700', label: 'Gold' },
  { color: '#FFA07A', label: 'Light Salmon' },
  { color: '#20B2AA', label: 'Light Sea Green' },
  { color: '#00CED1', label: 'Dark Turquoise' },
  { color: '#98FB98', label: 'Pale Green' },
  { color: '#87CEEB', label: 'Sky Blue' },
  { color: '#FF69B4', label: 'Hot Pink' },
  { color: '#9370DB', label: 'Medium Purple' },
  { color: '#F08080', label: 'Light Coral' },
  { color: '#DDA0DD', label: 'Plum' },
];

type ToolColorOptionProps = {
  color: string;
  label: string;
};

const ToolColorOption: React.FC<ToolColorOptionProps> = (props) => {
  const { color, label } = props;
  const { state, dispatch } = useRoomContext();

  const handleSelectColor = () => {
    dispatch({
      type: RoomActionType.SET_TOOL_COLOR,
      payload: { color },
    });
  };

  return (
    <Button
      aria-label={`${label} Color`}
      className="!p-1 aspect-square"
      variant={color === state.toolCustomization.color ? 'outline' : 'ghost'}
      onClick={handleSelectColor}
    >
      <div className="h-5 w-5 rounded-xl" style={{ backgroundColor: color }} />
    </Button>
  );
};

const RoomCustomizationColorPreselected: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-1">
      {PRESELECTED_COLORS.map((color) => {
        return <ToolColorOption key={color.color} {...color} />;
      })}
    </div>
  );
};

export default RoomCustomizationColorPreselected;
