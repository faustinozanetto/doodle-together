'use client';

import React from 'react';
import RoomTool, { RoomToolProps } from '../room-tool';
import { useIsRoomOwner } from '@modules/room/hooks/use-is-room-owner';
import { useMeStore } from '@modules/state/me.slice';
import { CanvasUtilityToolTypes, useCanvasCore } from '@doodle-together/canvas-renderer';
import { PointerIcon } from '@modules/ui/components/icons/pointer-icon';
import { capitalize } from '@modules/common/lib/common.lib';
import { HandIcon } from '@modules/ui/components/icons/hand-icon';

type RoomToolUtilityOption = Pick<RoomToolProps, 'icon'> & {
  utility: CanvasUtilityToolTypes;
  requiresOwner: boolean;
};

const TOOL_UTILITIES: RoomToolUtilityOption[] = [
  {
    requiresOwner: false,
    utility: 'select',
    icon: <PointerIcon className="stroke-current" />,
  },
  {
    requiresOwner: false,
    utility: 'hand',
    icon: <HandIcon className="stroke-current" />,
  },
  {
    requiresOwner: false,
    utility: 'eraser',
    icon: (
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
        <path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
        <path d="M18 13.3l-6.3 -6.3" />
      </svg>
    ),
  },
  {
    requiresOwner: true,
    utility: 'clear',
    icon: (
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
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
    ),
  },
];

const RoomToolsUtilities: React.FC = () => {
  const { me } = useMeStore();
  const { isRoomOwner } = useIsRoomOwner(me);

  const { setSelectedToolType, selectedToolType } = useCanvasCore();

  // Only render the tools the user has access to.
  const filteredTools = TOOL_UTILITIES.filter((tool) => !tool.requiresOwner || (tool.requiresOwner && isRoomOwner));

  return (
    <div className="flex gap-2">
      {TOOL_UTILITIES.map((utility) => {
        const utilityLabel = `${capitalize(utility.utility)} Utility`;
        const isSelected = selectedToolType === utility.utility;

        return (
          <RoomTool
            key={`utility-${utility.utility}`}
            label={utilityLabel}
            icon={utility.icon}
            isSelected={isSelected}
            onToolClicked={() => {
              setSelectedToolType(utility.utility);
            }}
          />
        );
      })}
    </div>
  );
};

export default RoomToolsUtilities;
