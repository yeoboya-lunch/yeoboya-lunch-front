import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {jwtToken} from '@libs/client/JwtToken';
import tokenAtom from '@libs/recoil/token';
import {useRouter} from 'next/router';
import memberAtom from '@libs/recoil/member';
import {useSession} from 'next-auth/react';

function useSilentRefresh() {
  const [refreshStop, setRefreshStop] = useState(false);
  const [token, setToken] = useRecoilState(tokenAtom);
  const [member, setMember] = useRecoilState(memberAtom);
  const resetToken = useResetRecoilState(tokenAtom);
  const resetMember = useResetRecoilState(memberAtom);
  const {post} = useFetchWrapper();
  const router = useRouter();

  const {data: session, status: statue} = useSession();
  console.log(session, statue);

  useQuery(
    ['REFRESH'],
    () =>
      post({
        url: 'user/reissue',
        data: {
          refreshToken: session?.user.refreshToken,
        },
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 0,
      refetchInterval: refreshStop ? false : 10 * 1000,
      refetchIntervalInBackground: true,
      enabled: session !== null && statue === 'authenticated',
      onError: () => {
        setRefreshStop(true);
        jwtToken.deleteToken();
        resetToken();
        resetMember();
        router.push('/');
      },
      onSuccess: (data) => {
        //todo session 업데이트
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
