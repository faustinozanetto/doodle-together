import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip';
import { capitalize } from '@modules/common/lib/common.lib';
import { iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';

type RoomCameraZoomProps = {
  type: 'in' | 'out';
  icon: React.ReactNode;
  onZoomClicked: () => void;
};

const RoomCameraZoom: React.FC<RoomCameraZoomProps> = (props) => {
  const { type, icon, onZoomClicked } = props;

  const label = `Zoom ${capitalize(type)}`;

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger aria-label={label} onClick={onZoomClicked}>
          <div className={iconButtonVariants({ variant: 'outline' })}>{icon}</div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="font-medium">{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoomCameraZoom;
