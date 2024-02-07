import { cls } from '@libs/client/utils';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { RoutesString } from '@types/brandingTypes';
import { usePathname } from 'next/navigation';

type Props = {
  children: ReactNode;
  to: RoutesString;
};

const NavItem = ({ children, to }: Props) => {
  const pathname = usePathname();
  return (
    <Link
      href={to}
      className={cls(
        'flex flex-col items-center space-y-2 ',
        pathname === to ? 'text-primary' : 'hover:text-gray-500',
      )}
    >
      {children}
    </Link>
  );
};

export default NavItem;
