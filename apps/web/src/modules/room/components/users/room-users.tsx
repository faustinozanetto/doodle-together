import React from 'react';
import RoomUserEntry from './room-user-entry';
import { Separator } from '@modules/ui/components/separator/separator';
import { useSnapshot } from 'valtio';
import { state } from '@modules/state/store';
import { User } from '@doodle-together/types';
import { AnimatePresence, motion } from 'framer-motion';

const RoomUsers: React.FC = () => {
  const currentState = useSnapshot(state);

  // Sort users so that owner is on top
  const sortedUsers = Object.entries(currentState.room?.users ?? {}).sort(([userId]) => {
    if (currentState.room && currentState.room.ownerId === userId) return -1;
    return 1;
  });

  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border pointer-events-auto h-fit min-w-[10rem]">
      <span className="font-bold">Users</span>
      <Separator />
      <ul className="gap-2 mt-2">
        <AnimatePresence>
          {sortedUsers.map(([userId, { username }], index) => {
            const user: User = {
              userId,
              username,
            };

            const isRoomOwner = (currentState.room && currentState.room.ownerId === userId) ?? false;

            const isCurrentUser = (currentState.me && currentState.me.userId === userId) ?? false;

            return (
              <motion.li
                key={userId}
                initial={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -10 }}
                transition={{
                  delay: 0.15 * index,
                }}
              >
                <RoomUserEntry user={user} isOwner={isRoomOwner} isCurrentUser={isCurrentUser} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default RoomUsers;
