'use client';

import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

import { cn } from '@/app/_lib/utils';

type Props = {
  children: ReactNode;
  to: Route;
};

const NavItem = ({ children, to }: Props) => {
  const pathname = usePathname();
  return (
    <Link
      href={to}
      className={cn(
        'flex flex-grow flex-col items-center space-y-2',
        pathname === to ? 'text-primary' : 'hover:text-gray-500',
      )}
    >
      {children}
    </Link>
  );
};

export default NavItem;
