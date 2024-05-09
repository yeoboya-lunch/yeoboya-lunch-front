'use client';

import axios, { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';

import { ApiSearch, Config } from '@/client/ApiClient';

type GetParams<B = unknown> = {
  url: string;
  params?: ApiSearch;
  config?: Config<B>;
};
type PostParams<B = unknown> = {
  url: string;
  data?: B;
  config?: Config<B>;
};
type PatchParams<B = unknown> = {
  url: string;
  data?: B;
  config?: Config<B>;
};
type DeleteParams<B = unknown> = {
  url: string;
  config?: Config<B>;
};
type Response<T = unknown> = {
  data: T;
  code: number;
  message: string;
};
type InfiniteScroll = {
  pageNo: number;
  size: number;
  numberOfElements: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
};
type Pagination = {
  page: number;
  isFirst: boolean;
  isLast: boolean;
  isEmpty: boolean;
  totalPages: number;
  totalElements: number;
};
export type InfiniteScrollData<T> = {
  list: T[];
  pagination: InfiniteScroll;
};
export type PaginationData<T> = {
  list: T[];
  pagination: PaginatiSon;
};

const useFetchWrapper = () => {
  const { data: session, status: statue } = useSession();

  axios.defaults.headers.common.Authorization =
    session !== null && statue === 'authenticated' ? `Bearer ${session.token.accessToken}` : null;

  function get<T = unknown, B = unknown>({
    url,
    params,
    config,
  }: GetParams<B>): Promise<AxiosResponse<Response<T>>> {
    return axios.get<Response<T>, AxiosResponse<Response<T>>, B>(url, {
      baseURL: process.env.NEXT_PUBLIC_API_SERVER,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      params: params,
      timeout: 0,
      ...config,
    });
  }

  function post<T = unknown, B = unknown>({
    url,
    data,
    config,
  }: PostParams<B>): Promise<AxiosResponse<Response<T>>> {
    return axios.post<Response<T>, AxiosResponse<Response<T>>, B>(url, data, {
      baseURL: process.env.NEXT_PUBLIC_API_SERVER,
      headers: {
        // Authorization: `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
      ...config,
    });
  }

  function patch<T = unknown, B = unknown>({
    url,
    data,
    config,
  }: PatchParams<B>): Promise<AxiosResponse<Response<T>>> {
    return axios.patch<Response<T>, AxiosResponse<Response<T>>, B>(url, data, {
      baseURL: process.env.NEXT_PUBLIC_API_SERVER,
      headers: {
        // Authorization: `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
      ...config,
    });
  }

  function axiosDelete<T = unknown>({
    url,
    config,
  }: DeleteParams): Promise<AxiosResponse<Response<T>>> {
    return axios.delete<Response<T>, AxiosResponse<Response<T>>>(url, {
      baseURL: process.env.NEXT_PUBLIC_API_SERVER,
      headers: {
        // Authorization: `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
      ...config,
    });
  }

  return { get, post, patch, axiosDelete };
};

export default useFetchWrapper;
