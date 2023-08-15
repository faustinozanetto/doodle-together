import React from 'react';

import { useCustomizationStore } from '@modules/state/customization.slice';
import { Switch } from '@modules/ui/components/switch/switch';

const RoomCustomizationBackgroundEnableGrid: React.FC = () => {
  const { background, setBackgroundGridEnabled } = useCustomizationStore();

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
