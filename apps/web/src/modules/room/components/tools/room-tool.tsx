'use client';

import React from 'react';
import { IconButton } from '@modules/ui/components/icon-button/icon-button';

type RoomToolProps = {
  name: string;
  icon: React.ReactNode;
};

const RoomTool: React.FC<RoomToolProps> = (props) => {
  const { name, icon } = props;

  return <IconButton aria-label={`${name} Tool`} icon={icon} />;
};

export default RoomTool;
