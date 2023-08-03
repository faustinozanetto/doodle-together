import { User } from '@doodle-together/types';
import { create } from 'zustand';

export interface MeSliceState {
  me: User | null;
  setMe: (me: User) => void;
  resetMe: () => void;
}

export const useMeStore = create<MeSliceState>((set) => ({
  me: null,
  setMe: (me: User) => set((state) => ({ me, resetMe: state.resetMe, setMe: state.setMe })),
  resetMe: () => set((state) => ({ me: null, resetMe: state.resetMe, setMe: state.setMe })),
}));
