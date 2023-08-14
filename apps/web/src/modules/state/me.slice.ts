import { User } from '@doodle-together/database';
import { create } from 'zustand';

export type MeSliceState = {
  me: User | null;
  accessToken: string | null;
};

export type MeSliceActions = {
  setMe: (me: User) => void;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
};

export const useMeStore = create<MeSliceState & MeSliceActions>((set) => ({
  me: null,
  accessToken: null,
  setAccessToken: (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    set({ accessToken });
  },
  setMe: (me) => {
    set({ me });
  },
  clearAccessToken: () => {
    localStorage.removeItem('accessToken');
    set({ accessToken: null });
  },
}));
