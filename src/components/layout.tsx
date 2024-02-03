import React from 'react';
import { cls } from '@libs/client/utils';
import NavBar from '@components/NavBar';
import BackButton from '@components/BackButton';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({ title, canGoBack, hasTabBar, children }: LayoutProps) {
  // useMemberInterval();
  return (
    <section className="w-full max-w-xl mx-auto">
      <div className="bg-white w-full h-12 max-w-xl justify-center text-lg px-10 font-medium  fixed text-gray-800 border-b top-0  flex items-center">
        {canGoBack ? <BackButton /> : null}
        {title ? <span className={cls(canGoBack ? 'mx-auto' : '', '')}>{title}</span> : null}
      </div>
      <div className={cls('pt-12', hasTabBar ? 'pb-24' : '')}>{children}</div>
      {hasTabBar ? <NavBar /> : null}
    </section>
  );
}
