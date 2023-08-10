import React from 'react';
import { Separator } from '@modules/ui/components/separator/separator';

type RoomCustomizationSectionProps = {
  name: string;
  children: React.ReactNode;
};

const RoomCustomizationSection: React.FC<RoomCustomizationSectionProps> = (props) => {
  const { name, children } = props;

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold">{name}</span>
      <Separator />
      {children}
    </div>
  );
};

export default RoomCustomizationSection;
