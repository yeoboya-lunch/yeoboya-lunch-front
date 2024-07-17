'use client';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const StateProvider = ({ children }: Props) => {
  return <>{children}</>;
};

export default StateProvider;
