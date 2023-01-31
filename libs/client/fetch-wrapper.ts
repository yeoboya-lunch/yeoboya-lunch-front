import axios from 'axios';
import {useRecoilValue} from 'recoil';
import {tokenState} from '@libs/states';
import {jwtToken} from '@libs/client/Token';

function useFetchWrapper() {
  const token = useRecoilValue(tokenState);

  axios.interceptors.request.use((config) => {
    console.log(token.accessToken);
    // console.log(jwtToken);
    if (jwtToken.haveRefreshToken()) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  interface GetParams {
    url: string;
    params?: any;
  }

  function get<T = any>({url, params}: GetParams): Promise<any> {
    return axios.get(url, {
      baseURL: process.env.NEXT_PUBLIC_API_SERVER,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      params: params,
      timeout: 0,
    });
  }

  interface PostParams {
    url: string;
    data?: any;
  }

  function post<T = any>({url, data}: PostParams): Promise<any> {
    return axios.post(url, data, {
      baseURL: process.env.NEXT_PUBLIC_API_SERVER,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
    });
  }

  return {get, post};
}
export {useFetchWrapper};
