import Room from '@modules/room/components/room';
import { RoomProvider } from '@modules/room/context/room-context';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getDataFromToken } from '@modules/common/lib/common.lib';
import { actions, state } from '@modules/state/store';
import { User } from '@doodle-together/types';

type RoomPageProps = {
  params: {
    roomId: string;
  };
};

const RoomPage: React.FC<RoomPageProps> = async (props) => {
  const { params } = props;
  const { roomId } = params;

  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  if (accessToken === undefined) {
    return redirect('/room/join');
  }

  // Decode JWT token and set me user.
  const { sub, username } = getDataFromToken(accessToken.value);
  const user: User = {
    userId: sub,
    username,
  };

  return (
    <RoomProvider>
      <Room roomId={roomId} user={user} />
    </RoomProvider>
  );
};

export default RoomPage;
