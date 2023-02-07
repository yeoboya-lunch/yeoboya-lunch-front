import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {jwtToken} from '@libs/client/JwtToken';
import tokenAtom from '@libs/recoil/token';
import {useRouter} from 'next/router';
import memberAtom from '@libs/recoil/member';

function useSilentRefresh() {
  const [refreshStop, setRefreshStop] = useState(false);
  const [token, setToken] = useRecoilState(tokenAtom);
  const [member, setMember] = useRecoilState(memberAtom);
  const resetToken = useResetRecoilState(tokenAtom);
  const resetMember = useResetRecoilState(memberAtom);
  const {post} = useFetchWrapper();
  const router = useRouter();

  useQuery(
    ['REFRESH'],
    () =>
      post({
        url: 'user/reissue',
        data: {
          refreshToken: jwtToken.refreshToken,
        },
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 0,
      refetchInterval: refreshStop ? false : 60 * 1000,
      refetchIntervalInBackground: true,
      enabled: !!member.email,
      onError: () => {
        setRefreshStop(true);
        jwtToken.deleteToken();
        resetToken();
        resetMember();
        router.push('/');
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

export {useSilentRefresh};
