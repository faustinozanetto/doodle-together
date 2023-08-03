import React from 'react';
import { iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip';

const RoomUserOwnerDecor: React.FC = () => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <div className={iconButtonVariants({ size: 'xs' })}>
            <svg
              className="h-5 w-5 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
            </svg>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="font-medium">Room Owner</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoomUserOwnerDecor;
