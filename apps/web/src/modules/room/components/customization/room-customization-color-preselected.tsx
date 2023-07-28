'use client';

import { useRoomContext } from '@modules/room/hooks/use-room-context';
import { RoomActionType } from '@modules/room/types/room.types';
import { Button } from '@modules/ui/components/button/button';
import React from 'react';

const PRESELECTED_COLORS: ToolColorOptionProps[] = [
  { color: '#FFB6C1', label: 'LightPink' },
  { color: '#FFC0CB', label: 'Pink' },
  { color: '#FFD700', label: 'Gold' },
  { color: '#FFA07A', label: 'LightSalmon' },
  { color: '#20B2AA', label: 'LightSeaGreen' },
  { color: '#00CED1', label: 'DarkTurquoise' },
  { color: '#98FB98', label: 'PaleGreen' },
  { color: '#87CEEB', label: 'SkyBlue' },
  { color: '#FF69B4', label: 'HotPink' },
  { color: '#9370DB', label: 'MediumPurple' },
  { color: '#F08080', label: 'LightCoral' },
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
