import { User } from '@doodle-together/types';
import { getDataFromToken } from '@modules/common/lib/common.lib';
import { proxy } from 'valtio';
import { subscribeKey } from 'valtio/utils';

export type MeSliceState = {
  accessToken?: string;
  me?: User;
};

export const meState = proxy<MeSliceState>({
  get me() {
    const { accessToken } = this;

    if (!accessToken) {
      return;
    }

    const { sub, username } = getDataFromToken(accessToken);
    return {
      userId: sub,
      username,
    };
  },
});

export const meActions = {
  setMe: (me: User): void => {
    meState.me = me;
  },
  setAccessToken: (accessToken: string) => {
    meState.accessToken = accessToken;
  },
  clearAccessToken: () => {
    meState.accessToken = undefined;
    localStorage.removeItem('accessToken');
  },
};

// Whenver accessToken changes, update local storage.
subscribeKey(meState, 'accessToken', () => {
  if (meState.accessToken) localStorage.setItem('accessToken', meState.accessToken);
});

export type MeActions = typeof meActions;
