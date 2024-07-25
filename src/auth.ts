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

type Error = {
  validation: {
    field: string;
    message: string;
  }[];
};
export const refreshAccessToken = async (loginId: Member['loginId']) => {
  try {
    const result = await apiClient.post<Token>('/user/reissue', {
      data: {
        loginId,
        provider: 'yeoboya',
      },
    });

    if (result?.code === 200) {
      await setToken(result.data);
      return {
        code: 200,
        message: 'success',
        data: result.data,
      } as const;
    }

    throw result;
  } catch (e) {
    return e as { code: number; message: string } & Error;
  }
};
