'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import useLocalStorage from 'use-local-storage';

import { useObserver } from '@/libs/client/useObserver';

type Props = {
  children: ReactNode;
  trigger: () => void;
};

const InfiniteScrollWrapper = ({ children, trigger }: Props) => {
  const bottom = useRef(null);
  const [scrollY] = useLocalStorage('order_list_scroll', 0);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && trigger();
  };

  useObserver({
    target: bottom,
    onIntersect,
  });

  useEffect(() => {
    if (scrollY !== 0) {
      window.scrollTo(0, Number(scrollY));
    }
  }, []);
  return (
    <>
      {children}
      <div ref={bottom} />
    </>
  );
};

export default InfiniteScrollWrapper;
