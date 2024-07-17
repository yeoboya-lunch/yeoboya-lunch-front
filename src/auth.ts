'use server';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Token } from 'domain/auth';
import { cookies } from 'next/headers';

dayjs.extend(duration);

export const deleteToken = async () => {
  cookies().delete('RefreshToken');
};

export const auth = async () => {};

export const handlers = async () => {};

export const setToken = async (token: Token) => {
  cookies().set('RefreshToken', token.refreshToken, {
    secure: true,
    httpOnly: true,
    // sameSite: 'strict',
    maxAge: dayjs(token.refreshTokenExpirationTime).diff(Date.now(), 'seconds'),
  });
};
