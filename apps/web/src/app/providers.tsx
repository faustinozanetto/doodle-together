'use client';

import React, { useEffect } from 'react';
import { ThemeProvider } from 'next-theme-kit';
import { ToastsProvider } from '@modules/ui/components/toasts/context/toasts-context';
import { ToastsContainer } from '@modules/ui/components/toasts/components/toasts-container';
import { useSnapshot } from 'valtio';
import { actions, state } from '@modules/state/store';
import { getDataFromToken } from '@modules/common/lib/common.lib';

type ProvidersProps = {
  children?: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = (props) => {
  const { children } = props;

  const currentState = useSnapshot(state);

  useEffect(() => {
    console.log('App useEffect - check token and send to proper page');

    actions.setIsLoading(true);

    const accessToken = localStorage.getItem('accessToken');

    // if there's not access token, we'll be shown the default
    // state.currentPage of AppPage.Welcome
    if (!accessToken) {
      actions.setIsLoading(false);
      return;
    }

    const { exp: tokenExp } = getDataFromToken(accessToken);
    const currentTimeInSeconds = Date.now() / 1000;

    // Remove old token
    // if token is within 10 seconds, we'll prevent
    // them from connecting (poll will almost be over)
    // since token duration and poll duration are
    // approximately at the same time
    if (tokenExp < currentTimeInSeconds - 10) {
      localStorage.removeItem('accessToken');
      actions.setIsLoading(false);
      return;
    }

    // reconnect to poll
    actions.setAccessToken(accessToken); // needed for socket.io connection
    // socket initialization on server sends updated poll to the client
    actions.setupSocket();
  }, []);

  return (
    <ThemeProvider useSystem={false} useLocalStorage>
      <ToastsProvider>
        {children}
        <ToastsContainer />
      </ToastsProvider>
    </ThemeProvider>
  );
};

export default Providers;
