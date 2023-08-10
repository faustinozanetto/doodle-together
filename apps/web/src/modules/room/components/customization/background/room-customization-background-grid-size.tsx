import React from 'react';
import { useSnapshot } from 'valtio';
import { customizationActions, customizationState } from '@modules/state/customization.slice';
import { Slider } from '@modules/ui/components/slider/slider';

const RoomCustomizationBackgroundGridSize: React.FC = () => {
  const customizationStateSnapshot = useSnapshot(customizationState);

  const handleGridSizeChange = (value: number[]) => {
    customizationActions.setBackgroundGridSize(value[0]);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center font-medium w-full justify-between text-sm">
        <span>Grid Size</span>
        <span>{customizationStateSnapshot.background.gridSize}</span>
      </div>
      <Slider defaultValue={[20]} min={10} max={100} step={5} onValueChange={handleGridSizeChange} />
    </div>
  );
};

export default RoomCustomizationBackgroundGridSize;
