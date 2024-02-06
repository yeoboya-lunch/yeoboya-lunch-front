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
  return (
    <section className="mx-auto w-full max-w-xl">
      <div className="fixed top-0 flex h-12 w-full max-w-xl items-center justify-center border-b bg-white px-10 text-lg font-medium text-gray-800">
        {canGoBack ? <BackButton /> : null}
        {title ? <span className={cls(canGoBack ? 'mx-auto' : '', '')}>{title}</span> : null}
      </div>
      <div className={cls('pt-12', hasTabBar ? 'pb-24' : '')}>{children}</div>
      {hasTabBar ? <NavBar /> : null}
    </section>
  );
}

/**
 * main -
 * 기본 레이아웃 + 메인 레이아웃
 * no-auth - 로그인 창
 */
