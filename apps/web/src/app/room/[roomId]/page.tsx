import { prisma } from '@doodle-together/database';
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

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1>Room ID:{roomId}</h1>
    </div>
  );
};

export default RoomPage;
