import React from 'react';
import { useSnapshot } from 'valtio';
import { meState } from '@modules/state/me.slice';
import { useIsRoomOwner } from '@modules/room/hooks/use-is-room-owner';
import RoomTool, { RoomToolProps } from './room-tool';

type ToolData = RoomToolProps & { requiresOwner: boolean };

const TOOLS: ToolData[] = [
  {
    requiresOwner: false,
    tool: 'pencil',
    icon: (
      <svg
        className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-50"
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
    requiresOwner: false,
    tool: 'eraser',
    icon: (
      <svg
        className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-50"
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
    tool: 'clear',
    icon: (
      <svg
        className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-50"
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

const RoomTools: React.FC = () => {
  const meSnapshot = useSnapshot(meState);

  const { isRoomOwner } = useIsRoomOwner(meSnapshot.me);

  // Only render the tools the user has access to.
  const filteredTools = TOOLS.filter((tool) => !tool.requiresOwner || (tool.requiresOwner && isRoomOwner));

  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border space-x-2 flex pointer-events-auto">
      {filteredTools.map((tool) => {
        return <RoomTool key={`tool-${tool.tool}`} {...tool} />;
      })}
    </div>
  );
};

export default RoomTools;
