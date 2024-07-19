import { create } from 'zustand';

type AuthState = {
  maxAge: string;
};

type AuthActions = {
  actions: {
    setMaxAge: (maxAge: AuthState['maxAge']) => void;
    reset: () => void;
  };
};

const INITIAL_STATE: AuthState = {
  maxAge: '',
};

const useAuthStore = create<AuthState & AuthActions>()((set, get) => ({
  ...INITIAL_STATE,
  actions: {
    reset: () => set(INITIAL_STATE),
    setMaxAge: (maxAge) => set({ maxAge }),
  },
}));

export const useMaxAge = () => useAuthStore((state) => state.maxAge);
export const useAuthActions = () => useAuthStore((state) => state.actions);
