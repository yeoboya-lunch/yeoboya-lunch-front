import {selector} from 'recoil';
import tokenAtom from './atom';

const getRefreshTokenExpirationTime = selector({
  key: 'getRefreshTokenExpirationTime',
  get: ({get}) => {
    let iToken = get(tokenAtom);

    return iToken.refreshTokenExpirationTime;
  },
  // set: ({get, set}) => {
  //   set(tokenAtom);
  // },
});

export default getRefreshTokenExpirationTime;
