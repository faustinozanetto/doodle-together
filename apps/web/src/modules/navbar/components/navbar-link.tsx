import React from 'react';
import Link from 'next/link';

export type NavbarLinkProps = {
  href: string;
  label: string;
};

const NavbarLink: React.FC<NavbarLinkProps> = (props) => {
  const { href, label } = props;

  return (
    <Link href={href} className="font-medium hover:text-primary">
      {label}
    </Link>
  );
};

export default NavbarLink;
