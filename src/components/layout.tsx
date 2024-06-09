import React from 'react';
import { ClassNameValue } from 'tailwind-merge';

import Header from '@/app/_components/ui/Header';
import NavBar from '@/app/_components/ui/nav/NavBar';
import { cn } from '@/app/_lib/utils';

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
      <section className={cn('flex flex-grow flex-col p-4', hasTabBar ? 'pb-16' : '', className)}>
        {children}
      </section>
      {hasTabBar && <NavBar />}
    </>
  );
}
