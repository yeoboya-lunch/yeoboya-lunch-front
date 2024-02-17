import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

import { cls } from '@/libs/client/utils';
import { Route } from '@/utils/brandingTypes';

type Props = {
  children: ReactNode;
  to: Route;
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
