import Room from '@modules/room/components/room';
import { RoomProvider } from '@modules/room/context/room-context';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

type RoomPageProps = {
  params: {
    roomId: string;
  };
};

const RoomPage: React.FC<RoomPageProps> = async (props) => {
  const { params } = props;
  const { roomId } = params;

  const accessToken = cookies().get('accessToken');

  // If now me is present in state, redirect.
  if (accessToken === undefined) {
    return redirect('/room/join');
  }

  return (
    <RoomProvider>
      <Room roomId={roomId} />
    </RoomProvider>
  );
};

export default RoomPage;
