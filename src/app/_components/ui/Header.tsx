import React from 'react';

import BackButton from '@/components/BackButton';
import { cls } from '@/libs/client/utils';

type Props = {
  canGoBack?: boolean;
  title: string | undefined;
};

const Header = ({ canGoBack, title }: Props) => {
  return (
    <div className="sticky top-0 z-10 flex h-12 w-full max-w-xl items-center justify-center border-b bg-white px-10 text-lg font-medium text-gray-800">
      {canGoBack && <BackButton />}
      <span className={cls(canGoBack ? 'mx-auto' : '', '')}>{title}</span>
    </div>
  );
};

export default Header;
