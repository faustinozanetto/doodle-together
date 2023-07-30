import React from 'react';
import { User } from '@doodle-together/types';
import { cn } from '@modules/ui/lib/ui.lib';
import { iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';

type RoomUserEntryProps = {
  user: User;
  isCurrentUser: boolean;
  isOwner: boolean;
};

const RoomUserEntry: React.FC<RoomUserEntryProps> = (props) => {
  const { user, isCurrentUser, isOwner } = props;

  return (
    <li className="flex gap-1 items-center justify-between">
      <span
        className={cn(
          'font-medium',
          isCurrentUser &&
            'underline decoration-2 decoration-primary-600 underline-offset-2 dark:decoration-primary-400'
        )}
      >
        {user.username}
      </span>
      {isOwner && (
        <div className={iconButtonVariants({ variant: 'ghost', size: 'xs' })}>
          <svg
            className="h-5 w-5 stroke-primary-600 dark:stroke-primary-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
          </svg>
        </div>
      )}
    </li>
  );
};

export default RoomUserEntry;
