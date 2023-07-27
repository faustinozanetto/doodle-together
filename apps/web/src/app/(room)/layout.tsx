import React from 'react';
import ThemeToggler from '@modules/theme/components/theme-toggler';

type RoomLayoutProps = {
  children: React.ReactNode;
};

const RoomLayout: React.FC<RoomLayoutProps> = (props) => {
  const { children } = props;

  return (
    <main className="flex items-center justify-center min-h-screen px-4 sm:px-0 relative">
      <div className="absolute top-2 right-2">
        <ThemeToggler />
      </div>
      {children}
    </main>
  );
};

export default RoomLayout;
