import {atom, selector, useRecoilState, useRecoilValue} from 'recoil';
import {recoilPersist} from 'recoil-persist';

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

const tokenState = atom<IToken>({
  key: 'tokenState',
  default: initialState,
  effects_UNSTABLE: [persistAtom],
});

const textState = atom({
  key: 'textState11', // unique ID(다른 atom/selectors 와 구별하기 위함)
  default: {
    name: '',
    value: '',
  }, // default value (=initial value)
  effects_UNSTABLE: [persistAtom],
});

export {tokenState, textState};
