import React from 'react';
import Navbar from '@modules/navbar/components/navbar';

type RoomLayoutProps = {
  children: React.ReactNode;
};

const RoomLayout: React.FC<RoomLayoutProps> = (props) => {
  const { children } = props;

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center flex-1">{children}</div>
    </main>
  );
};

export default RoomLayout;
