import { create } from 'zustand';

type AuthState = {
  token: string;
  maxAge: string;
};

type AuthActions = {
  actions: {
    init: (auth: AuthState) => void;
    reset: () => void;
  };
};

const INITIAL_STATE: AuthState = {
  token: '',
  maxAge: '',
};

const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  ...INITIAL_STATE,
  actions: {
    reset: () => set(INITIAL_STATE),
    init: (auth) => set({ token: auth.token, maxAge: auth.maxAge }),
  },
}));

export const useToken = () => useAuthStore((state) => state.token);
export const useMaxAge = () => useAuthStore((state) => state.maxAge);
export const useAuthActions = () => useAuthStore((state) => state.actions);
