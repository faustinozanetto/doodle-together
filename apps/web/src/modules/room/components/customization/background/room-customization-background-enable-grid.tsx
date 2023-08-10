import React from 'react';
import { useSnapshot } from 'valtio';
import { customizationActions, customizationState } from '@modules/state/customization.slice';
import { Switch } from '@modules/ui/components/switch/switch';

const RoomCustomizationBackgroundEnableGrid: React.FC = () => {
  const customizationStateSnapshot = useSnapshot(customizationState);

  const handleEnableGridChange = (checked: boolean) => {
    customizationActions.setBackgroundGridEnabled(!!checked);
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">Enable Grid?</span>
      <Switch checked={customizationStateSnapshot.background.enableGrid} onCheckedChange={handleEnableGridChange} />
    </div>
  );
};

export default RoomCustomizationBackgroundEnableGrid;
