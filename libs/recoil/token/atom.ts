import {recoilPersist} from 'recoil-persist';
import {atom} from 'recoil';

const {persistAtom} = recoilPersist();

interface IToken {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpirationTime: any;
}

const initialState: IToken = {
  accessToken: '',
  refreshToken: '',
  refreshTokenExpirationTime: '',
};

const tokenAtom = atom<IToken>({
  key: 'tokenAtom',
  default: initialState,
  effects_UNSTABLE: [persistAtom],
});

export default tokenAtom;
