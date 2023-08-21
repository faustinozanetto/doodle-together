import React from 'react';

import { Switch } from '@modules/ui/components/switch/switch';
import { useCanvasCustomization } from '@doodle-together/canvas-renderer';

const RoomCustomizationBackgroundEnableGrid: React.FC = () => {
  const { background, setBackgroundGridEnabled } = useCanvasCustomization();

  const handleEnableGridChange = (checked: boolean) => {
    setBackgroundGridEnabled(!!checked);
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">Enable Grid?</span>
      <Switch checked={background.enableGrid} onCheckedChange={handleEnableGridChange} />
    </div>
  );
};

export default RoomCustomizationBackgroundEnableGrid;
