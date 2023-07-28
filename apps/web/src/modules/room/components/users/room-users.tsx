'use client';

import React from 'react';
import { Separator } from '@radix-ui/react-separator';

const RoomUsers: React.FC = () => {
  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border pointer-events-auto h-fit">
      <span className="font-bold">Users</span>
      <Separator />
    </div>
  );
};

export default RoomUsers;
