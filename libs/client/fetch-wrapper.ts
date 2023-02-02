import axios from 'axios';
import {useRecoilValue} from 'recoil';
import {jwtToken} from '@libs/client/JwtToken';
import {getAccessToken} from '@libs/recoil/token';

function useFetchWrapper() {
  let token = useRecoilValue(getAccessToken);

  axios.defaults.headers.common['Authorization'] =
    token !== '' && jwtToken.haveRefreshToken() ? `Bearer ${token}` : null;

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
