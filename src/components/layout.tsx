import React from 'react';
import { ClassNameValue } from 'tailwind-merge';

import Header from '@/app/_components/ui/Header';
import { cn } from '@/app/_lib/utils';
import NavBar from '@/components/NavBar';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
  className?: ClassNameValue;
}

export default function Layout({ title, canGoBack, hasTabBar, children, className }: LayoutProps) {
  return (
    <>
      <Header title={title} canGoBack={canGoBack} />
      <div className={cn('flex flex-col p-4', hasTabBar ? 'pb-16' : '', className)}>{children}</div>
      {hasTabBar && <NavBar />}
    </>
  );
}
