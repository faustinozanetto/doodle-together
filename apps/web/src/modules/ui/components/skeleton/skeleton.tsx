import React from 'react';
import { cn } from '@modules/ui/lib/ui.lib';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton: React.FC<SkeletonProps> = (props) => {
  const { className, ...rest } = props;

  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...rest} />;
};

export default Skeleton;
