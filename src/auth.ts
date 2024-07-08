import axios from 'axios';

type Credentials = {
  loginId: string;
  email: string;
  password: string;
};
export const signIn = async (type: 'email', credentials: Credentials) => {
  const { loginId, email, password } = credentials;
  let payload;
  switch (type) {
    case 'email':
      payload = {
        loginId,
        email,
        password,
      };
      break;
  }
  const { status, data } = await axios.post('/user/sign-in', payload, {
    baseURL: process.env.NEXT_PUBLIC_API_SERVER,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    responseType: 'json',
  });
};

export const signOut = () => {};

export const auth = () => {};

export const handlers = {};
