import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { useRoomUsers } from '@modules/room/hooks/use-room-users';
import { meState } from '@modules/state/me.slice';
import RoomUserEntry from './room-user-entry';
import RoomPanel from '../room-panel';

const RoomUsers: React.FC = () => {
  const meSnapshot = useSnapshot(meState);

  const { users } = useRoomUsers({ sortUsers: true });

  return (
    <RoomPanel className="min-w-[10rem]" label="Users">
      <ul className="flex flex-col gap-2">
        <AnimatePresence>
          {users.map((user, index) => {
            const isCurrentUser = (meSnapshot && meSnapshot.me && meSnapshot.me.id === user.id) ?? false;

            return (
              <motion.li
                key={user.id}
                initial={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -10 }}
                transition={{
                  delay: 0.15 * index,
                }}
              >
                <RoomUserEntry user={user} isCurrentUser={isCurrentUser} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </RoomPanel>
  );
};

export default RoomUsers;
