'use client';

import { RecoilRoot } from 'recoil';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const StateProvider = ({ children }: Props) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default StateProvider;
