import ThemeToggler from '@modules/theme/components/theme-toggler';
import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
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

export default AuthLayout;
