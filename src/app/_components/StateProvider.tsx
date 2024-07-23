'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

type Props = {
  children: ReactNode;
};

const StateProvider = ({ children }: Props) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default StateProvider;
