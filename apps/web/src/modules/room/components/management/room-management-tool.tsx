'use client';

import React from 'react';

import { IconButton, IconButtonProps } from '@modules/ui/components/icon-button/icon-button';

type RoomManagementToolProps = IconButtonProps & {
  children: React.ReactNode;
  label: string;
  onToolClicked: (event: React.MouseEvent<HTMLElement>) => void;
};

const RoomManagementTool: React.FC<RoomManagementToolProps> = (props) => {
  const { children, label, onToolClicked, ...rest } = props;

  return (
    <div
      style={{
        pointerEvents: 'all',
      }}
    >
      <IconButton aria-label={label} onClick={onToolClicked} {...rest} />
      {children}
    </div>
  );
};

export default RoomManagementTool;
