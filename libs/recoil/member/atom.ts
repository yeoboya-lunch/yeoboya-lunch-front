import {recoilPersist} from 'recoil-persist';
import {atom} from 'recoil';

const {persistAtom} = recoilPersist();

interface IMember {
  name?: string;
  email: string;
  bankName?: string;
  accountNumber?: string;
}

const initialState: IMember = {
  name: '',
  email: '',
  bankName: '',
  accountNumber: '',
};

const memberAtom = atom<IMember>({
  key: 'memberAtom',
  default: initialState,
  effects_UNSTABLE: [persistAtom],
});

export default memberAtom;
