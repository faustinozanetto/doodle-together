import React from 'react';
import ThemeToggler from '@modules/theme/components/theme-toggler';
import Navbar from '@modules/navbar/components/navbar';

type RoomLayoutProps = {
  children: React.ReactNode;
};

const RoomLayout: React.FC<RoomLayoutProps> = (props) => {
  const { children } = props;

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Navbar />
      {children}
    </main>
  );
};

export default RoomLayout;
