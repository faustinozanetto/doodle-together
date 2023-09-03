'use client';

import React from 'react';
import RoomTool, { RoomToolProps } from '../room-tool';
import { useIsRoomOwner } from '@modules/room/hooks/use-is-room-owner';
import { useMeStore } from '@modules/state/me.slice';
import { CanvasUtilityToolTypes, useCanvasCoreStore } from '@doodle-together/canvas-renderer';
import { PointerIcon } from '@modules/ui/components/icons/pointer-icon';
import { HandIcon } from '@modules/ui/components/icons/hand-icon';
import { EraserIcon } from '@modules/ui/components/icons/eraser-icon';
import { DeleteIcon } from '@modules/ui/components/icons/delete-icon';

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
    icon: <EraserIcon className="stroke-current" />,
  },
  {
    requiresOwner: true,
    utility: 'clear',
    icon: <DeleteIcon className="stroke-current" />,
  },
];

const RoomToolsUtilities: React.FC = () => {
  const { me } = useMeStore();
  const { isRoomOwner } = useIsRoomOwner(me);

  const { setSelectedToolType, selectedToolType } = useCanvasCoreStore();

  // Only render the tools the user has access to.
  const filteredTools = TOOL_UTILITIES.filter((tool) => !tool.requiresOwner || (tool.requiresOwner && isRoomOwner));

  return (
    <div className="flex gap-2">
      {filteredTools.map((utility) => {
        const isSelected = selectedToolType === utility.utility;

        return (
          <RoomTool
            key={`utility-${utility.utility}`}
            tool={utility.utility}
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
