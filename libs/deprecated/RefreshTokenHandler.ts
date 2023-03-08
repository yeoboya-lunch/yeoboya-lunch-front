import {useSession} from 'next-auth/react';
import {Dispatch, SetStateAction, useEffect} from 'react';
import dayjs from 'dayjs';

interface Props {
  setRefreshTokenRotation: Dispatch<SetStateAction<number>>;
}

const RefreshTokenHandler = ({setRefreshTokenRotation}: Props) => {
  const {data: session} = useSession();
  useEffect(() => {
    if (!!session) {
      const nowTime = dayjs();
      const tokenExpirationTime = dayjs(session.token.tokenExpirationTime);
      let remainingTime = tokenExpirationTime.diff(nowTime, 'hour');
      setRefreshTokenRotation(remainingTime > 0 ? remainingTime : 0);
    }
  }, [session, setRefreshTokenRotation]);
  return null;
};

export default RefreshTokenHandler;
