'use client';

import { cn } from 'app/_lib/utils';
import React from 'react';

import BackButton from '@/components/BackButton';

type Props = {
  canGoBack?: boolean;
  title: string | undefined;
};

const Header = ({ canGoBack, title }: Props) => {
  return (
    <div className="sticky top-0 z-10 flex h-16 w-full max-w-xl items-center justify-center border-b bg-background px-10 py-3 text-3xl font-medium">
      {canGoBack && <BackButton />}
      <h1 className={cn(canGoBack ? 'mx-auto' : '', '')}>{title}</h1>
    </div>
  );
};

export default Header;
