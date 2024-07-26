'use server';

import apiClient, { ValidationError } from 'client/apiClient';
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
        isSuccess: true,
        data: result.data,
      } as const;
    }

    throw result;
  } catch (e) {
    if (e instanceof ValidationError) {
      return {
        isSuccess: false,
        message: e.message,
        validation: e.validation,
      } as const;
    }
    throw e;
  }
};
