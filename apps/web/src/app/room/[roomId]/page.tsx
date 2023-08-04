import Room from '@modules/room/components/room';
import { RoomProvider } from '@modules/room/context/room-context';
import { cookies } from 'next/headers';

const RoomPage: React.FC = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  return (
    <RoomProvider>
      <Room accessToken={accessToken} />
    </RoomProvider>
  );
};

export default RoomPage;
