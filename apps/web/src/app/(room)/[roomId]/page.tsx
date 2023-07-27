import ThemeToggler from '@modules/theme/components/theme-toggler';

type RoomPageProps = {
  params: {
    roomId: string;
  };
};

const RoomPage: React.FC<RoomPageProps> = (props) => {
  const { params } = props;
  const { roomId } = params;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1>Room ID:{roomId}</h1>
    </div>
  );
};

export default RoomPage;
