import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';

const { persistAtom } = recoilPersist();

interface IMember {
  name?: string;
  email: string | undefined;
  bankName?: string;
  accountNumber?: string;
  nickName?: string;
  phoneNumber?: string;
  bio?: string;
}

const initialState: IMember = {
  name: '',
  email: '',
  bankName: '',
  nickName: '',
  accountNumber: '',
  phoneNumber: '',
  bio: '',
};

const memberAtom = atom<IMember>({
  key: 'memberAtom',
  default: initialState,
  effects_UNSTABLE: [persistAtom],
});

export default memberAtom;
