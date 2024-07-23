'use server';

import apiClient from 'client/apiClient';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Token } from 'domain/auth';
import { Member } from 'domain/member';
import { cookies } from 'next/headers';

dayjs.extend(duration);

export const deleteToken = async () => {
  cookies().delete('RefreshToken');
};

export const setToken = async (token: Token) => {
  cookies().set('RefreshToken', token.refreshToken, {
    secure: process.env.NEXT_PUBLIC_MODE === 'prod',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: dayjs(token.refreshTokenExpirationTime).diff(Date.now(), 'seconds'),
  });
};

export const refreshAccessToken = async (loginId: Member['loginId']) => {
  const { data, code } = await apiClient.post<Token>('/user/reissue', {
    data: {
      loginId,
      provider: 'yeoboya',
    },
  });

  if (code === 200) {
    await setToken(data);
    return data;
  }
};
