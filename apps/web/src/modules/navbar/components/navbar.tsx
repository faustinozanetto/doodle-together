import Link from 'next/link';
import React from 'react';
import ThemeToggler from '@modules/theme/components/theme-toggler';
import NavbarLink, { NavbarLinkProps } from './navbar-link';

const NAVBAR_LINKS: NavbarLinkProps[] = [
  {
    href: '/room/join',
    label: 'Join',
  },
  {
    href: '/room/create',
    label: 'Create',
  },
];

const Navbar: React.FC = () => {
  return (
    <div className="bg-background/70 sticky left-0 right-0 top-0 z-[999] w-full border-b p-4 backdrop-blur-lg h-20 flex">
      <div className="mx-auto flex items-center container">
        <Link className="relative font-extrabold text-2xl z-50" href="/">
          Doodle Together
        </Link>

        <nav className="flex gap-4 ml-auto mr-4">
          {NAVBAR_LINKS.map((link) => {
            return <NavbarLink key={link.label} {...link} />;
          })}
        </nav>

        <ThemeToggler />
      </div>
    </div>
  );
};

export default Navbar;
