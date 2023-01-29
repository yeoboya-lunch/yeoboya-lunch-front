import axios, {AxiosResponse} from 'axios';
import {authToken} from '@libs/client/AuthToken';

axios.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    if (authToken.haveAccessToken()) {
      console.log(authToken.accessToken);
      config.headers.Authorization = `Bearer ${authToken.accessToken}`;
    }
  }
  return config;
});

interface GetParams {
  url: string;
  params?: any;
}

async function get<T = any>({url, params}: GetParams): Promise<AxiosResponse> {
  return await axios
    .get(url, {
      baseURL: process.env.NEXT_PUBLIC_API_SERVER,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      params: params,
      timeout: 0,
    })
    .then((r: AxiosResponse<any>) => r)
    .catch((reason) => reason);
}

interface PostParams {
  url: string;
  data?: any;
}

async function post<T = any>({url, data}: PostParams): Promise<AxiosResponse> {
  return await axios
    .post(url, data, {
      baseURL: process.env.NEXT_PUBLIC_API_SERVER,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
    })
    .then((r: AxiosResponse<any>) => r)
    .catch((reason) => reason);
}

export {get, post};