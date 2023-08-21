import React from 'react';
import { Slider } from '@modules/ui/components/slider/slider';
import { useCanvasCustomization } from '@doodle-together/canvas-renderer';

const RoomCustomizationBackgroundGridSize: React.FC = () => {
  const { background, setBackgroundGridSize } = useCanvasCustomization();

  const handleGridSizeChange = (value: number[]) => {
    setBackgroundGridSize(value[0]);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center font-medium w-full justify-between text-sm">
        <span>Grid Size</span>
        <span>{background.gridSize}</span>
      </div>
      <Slider defaultValue={[20]} min={10} max={100} step={5} onValueChange={handleGridSizeChange} />
    </div>
  );
};

export default RoomCustomizationBackgroundGridSize;
