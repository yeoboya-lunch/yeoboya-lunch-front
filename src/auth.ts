import axios from 'axios';

export const signIn = async (type, credencials) => {
  let payload;
  switch (type) {
    case 'email':
      payload = {
        email: credencials.email,
        password: credencials.password,
      };
      break;
  }
  const { status, data } = await axios.post('/user/sign-in', payload, {
    baseURL: process.env.NEXT_PUBLIC_API_SERVER,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    responseType: 'json',
  });
  console.log(status, data);
};

export const signOut = () => {};

export const auth = () => {};

export const handlers = {};
