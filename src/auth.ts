'use server';

import axios from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Token } from 'domain/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

dayjs.extend(duration);

export const signOut = async () => {
  cookies().delete('RT');
  NextResponse.next().headers.delete('Authorization');
};

export const auth = async () => {};

export const handlers = async () => {};

export const setToken = async (token: Token) => {
  cookies().set('RT', token.refreshToken, {
    secure: true,
    httpOnly: true,
    maxAge: dayjs(token.refreshTokenExpirationTime).diff(Date.now(), 'seconds'),
  });
  cookies().set('AT', token.accessToken, {
    secure: true,
    httpOnly: true,
    maxAge: dayjs(token.tokenExpirationTime).diff(Date.now(), 'seconds'),
  });
};

async function refreshAccessToken() {
  const refreshToken = cookies().get('RT');
  const res = await axios
    .post(
      '/user/reissue',
      { refreshToken },
      {
        baseURL: process.env.NEXT_PUBLIC_API_SERVER,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        responseType: 'json',
      },
    )
    .catch((r) => {
      throw new Error(r);
    });
  if (res.data.code === 200) {
    return res.data;
  }
  return token;
}
