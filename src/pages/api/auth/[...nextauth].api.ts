import { TypeORMLegacyAdapter } from '@next-auth/typeorm-legacy-adapter';
import { compareSync } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions, SessionOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Cookies from 'cookies';
import { decode, encode } from 'next-auth/jwt';

import initDatabase, { postgresConfig } from '@server/configs/db';
import configEnv from '@server/configs/env';
import {
  SESSION_MAX_AGE,
  SESSION_TOKEN_NAME,
  SESSION_UPDATE_AGE,
} from '@server/utils/constants.util';
import * as overriddenAuthEntities from '@server/utils/overriddenAuthenEntities.util';
import {
  calculateSessionCookieExpiry,
  generateSessionTokenKey,
} from '@server/utils/session.util';

const databaseAdapter = TypeORMLegacyAdapter(
  {
    type: 'postgres',
    ...postgresConfig,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
  },
  {
    entities: overriddenAuthEntities,
  }
);

const customSession: Partial<SessionOptions> = {
  maxAge: SESSION_MAX_AGE,
  updateAge: SESSION_UPDATE_AGE,
};

const customCookies = {
  sessionToken: {
    name: SESSION_TOKEN_NAME,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: configEnv.app.ENVIRONMENT === 'production',
    },
  },
};
export const authOptions = (
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions => {
  const isCredentialAuthen =
    req?.query?.nextauth?.includes('callback') &&
    req?.query?.nextauth?.includes('credentials') &&
    req.method === 'POST';

  return {
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: 'Email', type: 'text', placeholder: 'you@email.com' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials, req) {
          try {
            // You need to provide your own logic here that takes the credentials
            // submitted and returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            // You can also use the `req` object to obtain additional parameters
            // (i.e., the request IP address)
            const repository = (await initDatabase()).getRepository(
              overriddenAuthEntities.UserEntity
            );
            const user = await repository.findOne({
              where: { email: credentials?.email },
            });
            if (
              user &&
              user.password &&
              compareSync(credentials?.password as string, user.password)
            ) {
              return user;
            }
            return null;
          } catch (error) {
            throw error;
          }
        },
      }),
      GoogleProvider({
        clientId: configEnv.google.GOOGLE_CLIENT_ID,
        clientSecret: configEnv.google.GOOGLE_CLIENT_SECRET,
      }),
    ],
    adapter: databaseAdapter,
    cookies: customCookies,
    session: customSession,
    callbacks: {
      async signIn({ user }) {
        if (!user) return false;
        if (!isCredentialAuthen) return true;

        const existedSessionInCookie = new Cookies(req, res).get(
          SESSION_TOKEN_NAME
        );
        if (existedSessionInCookie) return true;

        const sessionToken = generateSessionTokenKey();
        const sessionExpiry = calculateSessionCookieExpiry(SESSION_MAX_AGE);

        await databaseAdapter.createSession({
          sessionToken: sessionToken,
          userId: user.id,
          expires: sessionExpiry,
        });

        const cookies = new Cookies(req, res);
        cookies.set(SESSION_TOKEN_NAME, sessionToken, {
          expires: sessionExpiry,
        });
        return true;
      },
      async session({ session, user }) {
        return { ...session, user: { ...session?.user, id: user?.id } };
      },
    },
    jwt: {
      async encode(params) {
        if (isCredentialAuthen) {
          const cookies = new Cookies(req, res);
          const cookie = cookies.get(SESSION_TOKEN_NAME);

          if (!cookie) return '';
          return cookie;
        }

        return encode(params);
      },
      async decode(params) {
        if (isCredentialAuthen) return null;

        return decode(params);
      },
    },
  };
};

const nextAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions(req, res));
};

export default nextAuth;
