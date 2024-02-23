import { HomeIcon, ListBulletIcon, PersonIcon } from '@radix-ui/react-icons';
import React from 'react';

import NavItem from '@/app/_components/ui/nav/NavItem';

const NavBar = () => {
  return (
    <footer className="fixed bottom-0 flex w-full max-w-xl justify-between border-t bg-white px-4 py-2 text-xs font-semibold text-muted-foreground">
      <NavItem to="/">
        <HomeIcon className="h-6 w-6" />
        <span>오늘의주문</span>
      </NavItem>
      <NavItem to="/community">
        <ListBulletIcon className="h-6 w-6" />
        <span>자유게시판</span>
      </NavItem>
      <NavItem to="/profile">
        <PersonIcon className="h-6 w-6" />
        <span>프로필</span>
      </NavItem>
    </footer>
  );
};

export default NavBar;
