import {atom, selector, useRecoilState, useRecoilValue} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

interface IToken {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpirationTime: any;
}

const tokenState = atom<IToken>({
  key: 'tokenState',
  default: {
    accessToken: '',
    refreshToken: '',
    refreshTokenExpirationTime: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export {tokenState};
