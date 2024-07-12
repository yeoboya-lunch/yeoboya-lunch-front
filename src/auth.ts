'use server';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Token } from 'domain/auth';
import { cookies } from 'next/headers';

dayjs.extend(duration);

export const signOut = async () => {};

export const auth = async () => {};

export const handlers = async () => {};

export const setToken = async (token: Token) => {
  console.log(token);
  cookies().set('RT', token.refreshToken, {
    secure: true,
    httpOnly: true,
    maxAge: dayjs(token.refreshTokenExpirationTime).diff(Date.now(), 'seconds'),
  });
};
