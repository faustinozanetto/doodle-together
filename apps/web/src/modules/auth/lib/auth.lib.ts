import { authConfig } from '@config/config';
import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const AUTH_OPTIONS: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: authConfig.githubClientId,
      clientSecret: authConfig.githubClientSecret,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};
