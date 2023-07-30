import ThemeToggler from '@modules/theme/components/theme-toggler';
import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="bg-background/70 dark:bg-background/70 sticky left-0 right-0 top-0 z-[999] w-full border-b p-4 backdrop-blur-lg h-20 flex">
      <div className="mx-auto flex items-center justify-between sm:container">
        <Link className="font-extrabold text-2xl text-primary-600 dark:text-primary-400" href="/">
          Doodle Together
        </Link>
        <ThemeToggler />
      </div>
    </div>
  );
};

export default Navbar;
