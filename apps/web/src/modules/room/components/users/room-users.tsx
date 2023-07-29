import React from 'react';
import RoomUserEntry from './room-user-entry';
import { Separator } from '@modules/ui/components/separator/separator';
import { RoomUsers } from '@doodle-together/types';

type RoomUsersProps = {
  users?: RoomUsers;
};

const RoomUsers: React.FC<RoomUsersProps> = (props) => {
  const { users = {} } = props;

  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border pointer-events-auto h-fit">
      <span className="font-bold">Users</span>
      <Separator />
      <ul>
        {Object.entries(users).map(([userId, username]) => {
          return <RoomUserEntry key={userId} user={{ userId, username }} />;
        })}
      </ul>
    </div>
  );
};

export default RoomUsers;
