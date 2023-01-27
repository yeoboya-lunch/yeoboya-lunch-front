import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {authToken} from '@libs/client/AuthToken';
import {post} from '@libs/client/api';

function useSilentRefresh() {
  const [refreshStop, setRefreshStop] = useState(false);

  useQuery(
    ['REFRESH'],
    () =>
      post({
        url: 'user/reissue',
        data: {
          accessToken: authToken.accessToken,
          refreshToken: authToken.refreshToken,
        },
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 2,
      refetchInterval: refreshStop ? false : 10000, // 10초
      refetchIntervalInBackground: true,
      onError: () => {
        setRefreshStop(true);
        authToken.setToken({accessToken: '', refreshToken: '', refreshTokenExpirationTime: ''});
      },
      onSuccess: (data) => {
        authToken.setToken({
          accessToken: data.data.data.accessToken,
          refreshToken: data.data.data.refreshToken,
          refreshTokenExpirationTime: data.data.data.refreshTokenExpirationTime,
        });
      },
    },
  );
}

function useCheckCurrentUser() {
  const currentUserQuery = useQuery(['CURRENT_USER'], () => {}, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 2,
    staleTime: 24 * 60 * 60 * 1000,
    onError: () => {
      authToken.setToken({accessToken: '', refreshToken: '', refreshTokenExpirationTime: ''});
    },
  });
}

export {useSilentRefresh, useCheckCurrentUser};
