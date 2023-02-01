import {selector} from 'recoil';
import tokenAtom from './atom';

const getAccessToken = selector({
  key: 'getAccessToken',
  get: ({get}) => {
    let iToken = get(tokenAtom);
    return iToken.accessToken;
  },
  // set: ({get, set}) => {
  //   set(tokenAtom);
  // },
});

export default getAccessToken;
