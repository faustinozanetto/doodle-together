import React from 'react';
import { SquareIcon } from '@modules/ui/components/icons/square-icon';
import { CircleIcon } from '@modules/ui/components/icons/circle-icon';
import RoomTool, { RoomToolProps } from '../room-tool';
import { CanvasShapeToolTypes, useCanvasCoreStore } from '@doodle-together/canvas-renderer';
import { capitalize } from '@modules/common/lib/common.lib';
import { DiamondIcon } from '@modules/ui/components/icons/diamond-icon';
import { HexagonIcon } from '@modules/ui/components/icons/hexagon-icon';
import { TriangleIcon } from '@modules/ui/components/icons/triangle-icon';

type RoomToolShapeOption = Pick<RoomToolProps, 'icon'> & {
  shape: CanvasShapeToolTypes;
};

const TOOL_SHAPES: RoomToolShapeOption[] = [
  {
    shape: 'draw',
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
        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
      </svg>
    ),
  },
  {
    shape: 'box',
    icon: <SquareIcon className="stroke-current" />,
  },
  {
    shape: 'circle',
    icon: <CircleIcon className="stroke-current" />,
  },
  {
    shape: 'diamond',
    icon: <DiamondIcon className="stroke-current" />,
  },
  {
    shape: 'hexagon',
    icon: <HexagonIcon className="stroke-current" />,
  },
  {
    shape: 'triangle',
    icon: <TriangleIcon className="stroke-current" />,
  },
];

const RoomToolsShapes: React.FC = () => {
  const { setSelectedToolType, selectedToolType } = useCanvasCoreStore();

  return (
    <div className="flex gap-2">
      {TOOL_SHAPES.map((shape) => {
        const isSelected = selectedToolType === shape.shape;

        return (
          <RoomTool
            key={`shape-${shape.shape}`}
            tool={shape.shape}
            icon={shape.icon}
            isSelected={isSelected}
            onToolClicked={() => {
              setSelectedToolType(shape.shape);
            }}
          />
        );
      })}
    </div>
  );
};

export default RoomToolsShapes;
