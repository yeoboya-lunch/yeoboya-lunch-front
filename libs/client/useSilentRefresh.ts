import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {jwtToken} from '@libs/client/JwtToken';
import tokenAtom from '@libs/recoil/token';

function useSilentRefresh() {
  const [refreshStop, setRefreshStop] = useState(false);
  const [token, setToken] = useRecoilState(tokenAtom);
  const resetToken = useResetRecoilState(tokenAtom);
  const {post} = useFetchWrapper();

  useQuery(
    ['REFRESH'],
    () =>
      post({
        url: 'user/reissue',
        data: {
          refreshToken: token.refreshToken,
        },
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 2,
      refetchInterval: refreshStop ? false : 60 * 60 * 1000,
      refetchIntervalInBackground: true,
      onError: () => {
        setRefreshStop(true);
        jwtToken.deleteToken();
        resetToken();
      },
      onSuccess: (data) => {
        jwtToken.setToken({
          refreshToken: data.data.data.refreshToken,
          refreshTokenExpirationTime: data.data.data.refreshTokenExpirationTime,
        });
        setToken({
          accessToken: data.data.data.accessToken,
          refreshToken: data.data.data.refreshToken,
          refreshTokenExpirationTime: data.data.data.refreshTokenExpirationTime,
        });
      },
    },
  );
}

function useCheckCurrentUser() {
  const [token, setToken] = useRecoilState(tokenAtom);
  const currentUserQuery = useQuery(['CURRENT_USER'], () => {}, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 2,
    staleTime: 24 * 60 * 60 * 1000,
    onError: () => {
      setToken({accessToken: '', refreshToken: '', refreshTokenExpirationTime: ''});
    },
  });
}

export {useSilentRefresh, useCheckCurrentUser};
