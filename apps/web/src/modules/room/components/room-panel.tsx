import { Separator } from '@modules/ui/components/separator/separator';
import { cn } from '@modules/ui/lib/ui.lib';
import React from 'react';

type RoomPanelProps = {
  label: string;
  className?: string;
  children: React.ReactNode;
};

const RoomPanel: React.FC<RoomPanelProps> = (props) => {
  const { label, className, children } = props;

  return (
    <div
      className={cn(
        'bg-background p-2.5 rounded-lg shadow-lg border pointer-events-auto gap-2 flex flex-col',
        className
      )}
    >
      <span className="font-bold">{label}</span>
      <Separator />
      {children}
    </div>
  );
};

export default RoomPanel;
