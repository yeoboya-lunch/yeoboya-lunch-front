import { Config, Params } from '@/client/ApiClient';

type GetParams = {
  url: string;
  params?: Params;
  config?: Partial<Config>;
};
type PostParams<B = unknown> = {
  url: string;
  data?: B;
  params?: Params;
  config?: Partial<Config>;
};
type PatchParams<B = unknown> = {
  url: string;
  data?: B;
  params?: Params;
  config?: Partial<Config>;
};
type DeleteParams = {
  url: string;
  params?: Params;
  config?: Partial<Config>;
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
  pagination: Pagination;
};

const paramToString = (params?: URLSearchParams) => (params ? `?${params}` : '');

const client = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_SERVER;
  const baseHeader = new Headers({
    'Content-Type': 'application/json',
    Credentials: 'include',
  });

  return {
    get: async <T = unknown>({ url, params, config }: GetParams): Promise<Response<T>> => {
      const fetchUrl = `${baseUrl}${url}${paramToString(params)}`;
      const fetchHeader = new Headers({ ...baseHeader, ...config?.headers });

      const result = await fetch(fetchUrl, {
        method: 'GET',
        credentials: 'include',
        headers: fetchHeader,
        ...config,
      });

      if (result.ok) {
        return result.json();
      }

      throw result.json();
    },
    post: async <T = unknown, B = unknown>({
      url,
      params,
      data,
      config,
    }: PostParams<B>): Promise<Response<T>> => {
      const fetchUrl = `${baseUrl}${url}${paramToString(params)}`;
      const fetchHeader = new Headers({
        'content-type': 'application/json;charset=UTF-8',
        ...baseHeader,
        ...config?.headers,
      });
      const result = await fetch(fetchUrl, {
        method: 'POST',
        headers: fetchHeader,
        body: JSON.stringify(data),
        ...config,
      });
      if (result.ok) {
        return result.json();
      }

      throw result.json();
    },
    patch: async <T = unknown, B = unknown>({
      url,
      params,
      data,
      config,
    }: PatchParams<B>): Promise<Response<T>> => {
      const fetchUrl = `${baseUrl}${url}${paramToString(params)}`;
      const fetchHeader = new Headers({
        'content-type': 'application/json;charset=UTF-8',
        ...baseHeader,
        ...config?.headers,
      });
      const result = await fetch(fetchUrl, {
        method: 'PATCH',
        headers: fetchHeader,
        body: JSON.stringify(data),
        ...config,
      });

      if (result.ok) {
        return result.json();
      }

      throw result.json();
    },
    delete: async <T = unknown>({ url, params, config }: DeleteParams): Promise<Response<T>> => {
      const fetchUrl = `${baseUrl}${url}${paramToString(params)}`;
      const fetchHeader = new Headers({ ...baseHeader, ...config?.headers });

      const result = await fetch(fetchUrl, {
        method: 'DELETE',
        headers: fetchHeader,
        ...config,
      });

      if (result.ok) {
        return result.json();
      }

      throw result.json();
    },
  };
};

const apiClient = client();

export default apiClient;
