import { prisma } from '@doodle-together/database';
import Room from '@modules/room/components/room';
import { notFound } from 'next/navigation';

type RoomPageProps = {
  params: {
    roomId: string;
  };
};

const RoomPage: React.FC<RoomPageProps> = async (props) => {
  const { params } = props;
  const { roomId } = params;

  const room = await prisma.room.findFirst({
    where: { id: roomId },
  });

  if (!room) {
    return notFound();
  }

  return <Room />;
};

export default RoomPage;
