import React from 'react';

import Header from '@/app/_components/ui/Header';
import NavBar from '@/components/NavBar';
import { cn } from '@/app/_lib/utils';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({ title, canGoBack, hasTabBar, children }: LayoutProps) {
  return (
    <>
      <Header title={title} canGoBack={canGoBack} />
      <div className={cn('p-4', hasTabBar ? 'pb-16' : '')}>{children}</div>
      {hasTabBar ? <NavBar /> : null}
    </>
  );
}
