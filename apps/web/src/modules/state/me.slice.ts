import { User } from '@doodle-together/database';
import { proxy } from 'valtio';

export type MeSliceState = {
  me: User | null;
};

export const meState = proxy<MeSliceState>({ me: null });

export const meActions = {
  setMe: (me: User): void => {
    meState.me = me;
  },
};

export type MeActions = typeof meActions;
