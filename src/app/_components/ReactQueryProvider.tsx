'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { ReactNode } from 'react';

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

const ReactQueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
