import { create } from 'zustand';

type MemberState = {
  loginId: string;
};

type MemberActions = {
  actions: {
    reset: () => void;
    setMember: (user: MemberState) => void;
  };
};

const INITIAL_STATE: MemberState = {
  loginId: '',
};

const useMemberStore = create<MemberState & MemberActions>()((set) => ({
  ...INITIAL_STATE,
  actions: {
    reset: () => set(INITIAL_STATE),
    setMember: (user) => set({ loginId: user.loginId }),
  },
}));

export const useLoginId = () => useMemberStore((state) => state.loginId);
export const useMemberActions = () => useMemberStore((state) => state.actions);
