import axios from 'axios';
import {useRecoilState, useRecoilValue} from 'recoil';
import {textState, tokenState} from '@libs/states';
import {jwtToken} from '@libs/client/Token';

function useFetchWrapper() {
  // const token = useRecoilValue(tokenState);
  // const test = useRecoilValue(textState);

  const [token, setToken] = useRecoilState(tokenState);
  const [test, setText] = useRecoilState(textState);

  axios.defaults.headers.common['Authorization'] =
    token.accessToken !== '' && jwtToken.haveRefreshToken() ? `Bearer ${token.accessToken}` : null;

  // axios.interceptors.request.use((config) => {
  //   if (token.accessToken !== '' && jwtToken.haveRefreshToken()) {
  //     console.group();
  //     console.log(test.value);
  //     console.log(token.accessToken);
  //     console.groupEnd();
  //     // config.headers['Authorization'] = `Bearer ${token.accessToken}`;
  //   }
  //   return config;
  // });

  // axios.interceptors.response.use(
  //   function (response) {
  //     return response;
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   },
  // );

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
    config?: any;
  }

  function post<T = any>({url, data, config}: PostParams): Promise<any> {
    return axios.post(url, data, {
      baseURL: process.env.NEXT_PUBLIC_API_SERVER,
      headers: {
        ...config,
        // Authorization: `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
    });
  }

  return {get, post};
}
export {useFetchWrapper};
