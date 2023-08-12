import { User } from '@doodle-together/database';
import { proxy } from 'valtio';
import { subscribeKey } from 'valtio/utils';

export type MeSliceState = {
  me: User | null;
  accessToken: string | null;
};

export const meState = proxy<MeSliceState>({ me: null, accessToken: null });

export const meActions = {
  setMe: (me: User): void => {
    meState.me = me;
  },
  setAccessToken: (accessToken: string) => {
    meState.accessToken = accessToken;
  },
  clearAccessToken: () => {
    meState.accessToken = null;
    localStorage.removeItem('accessToken');
  },
};

subscribeKey(meState, 'accessToken', () => {
  if (meState.accessToken) {
    localStorage.setItem('accessToken', meState.accessToken);
  }
});

export type MeActions = typeof meActions;
