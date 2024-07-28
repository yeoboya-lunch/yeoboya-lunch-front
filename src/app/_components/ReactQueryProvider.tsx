'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthError } from 'client/apiClient';
import { redirect, RedirectType } from 'next/navigation';
import React, { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: (error) => {
        if (error instanceof AuthError) {
          if (error.status === 401) {
            redirect('/auth/login', RedirectType.replace);
          }
        }

        return true;
      },
      retry: (failureCount, error) => {
        if (error instanceof AuthError) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

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
