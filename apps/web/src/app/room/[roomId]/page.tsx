import Room from '@modules/room/components/room';
import { RoomProvider } from '@modules/room/context/room-context';

type RoomPageProps = {
  params: {
    roomId: string;
  };
};

const RoomPage: React.FC<RoomPageProps> = async (props) => {
  const { params } = props;
  const { roomId } = params;

  return (
    <RoomProvider>
      <Room roomId={roomId} />
    </RoomProvider>
  );
};

export default RoomPage;
