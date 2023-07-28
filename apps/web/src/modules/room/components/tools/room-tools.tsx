'use client';

import React from 'react';
import RoomTool from './room-tool';

const RoomTools: React.FC = () => {
  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border">
      <RoomTool
        name="Draw"
        icon={
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
        }
      />
    </div>
  );
};

export default RoomTools;
