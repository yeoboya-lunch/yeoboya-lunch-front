import { create } from 'zustand';

type AuthState = {
  auth: {} | null;
};

type AuthActions = {};

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  auth: null,
  actions: {
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
  },
}));

export const useAuth = () => useAuthStore((state) => state.auth);
export const useAuthActions = () => useAuthStore((state) => state.actions);
