import React from 'react';
import { User } from '@doodle-together/types';

type RoomUserEntryProps = {
  user: User;
};

const RoomUserEntry: React.FC<RoomUserEntryProps> = (props) => {
  const { user } = props;

  return (
    <li>
      <span className="text-sm">{user.username}</span>
    </li>
  );
};

export default RoomUserEntry;
