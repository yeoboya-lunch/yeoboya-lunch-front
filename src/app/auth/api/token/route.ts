import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// accessToken 접근
export const GET = async () => {
  const accessToken = cookies().get('AccessToken');
  if (accessToken) {
    cookies().delete('AccessToken');
    return NextResponse.json({ data: accessToken?.value, code: 200, message: '' });
  }
  return NextResponse.json({ data: null, code: 404, message: 'No Token' });
};
