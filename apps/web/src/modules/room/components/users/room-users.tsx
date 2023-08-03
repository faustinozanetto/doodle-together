import React from 'react';
import RoomUserEntry from './room-user-entry';
import { Separator } from '@modules/ui/components/separator/separator';
import { AnimatePresence, motion } from 'framer-motion';
import { useRoomUsers } from '@modules/room/hooks/use-room-users';
import { useMeStore } from '@modules/state/me.slice';
import { useRoomStore } from '@modules/state/room.slice';

const RoomUsers: React.FC = () => {
  const { me } = useMeStore();
  const { room } = useRoomStore();
  const { users } = useRoomUsers({ sortUsers: true });

  return (
    <div className="bg-foreground p-2 rounded-lg shadow-lg border pointer-events-auto h-fit min-w-[10rem]">
      <span className="font-bold">Users</span>
      <Separator />
      <ul className="gap-2 mt-2">
        <AnimatePresence>
          {users.map((user, index) => {
            const isRoomOwner = (room && room.ownerId === user.userId) ?? false;

            const isCurrentUser = (me && me.userId === user.userId) ?? false;

            return (
              <motion.li
                key={user.userId}
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
