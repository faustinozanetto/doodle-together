import { AUTH_OPTIONS } from '@modules/auth/lib/auth.lib';
import NextAuth from 'next-auth';

const handler = NextAuth(AUTH_OPTIONS);
export { handler as GET, handler as POST };
