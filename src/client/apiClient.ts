export type Headers = { [key: string]: string };
export type Options<B = unknown> = {
  headers?: Headers;
  params?: Params;
  data?: B;
};
export type Params = URLSearchParams;
export type PaginationOptions = {
  page?: number;
  size?: number;
};

type GetConfig = {
  url: string;
  params?: Params;
  config?: Omit<Options, 'data'>;
};
type PostConfig<B> = {
  url: string;
  config?: Options<B>;
};
type PatchConfig<B> = {
  url: string;
  config?: Options<B>;
};
type DeleteConfig = {
  url: string;
  config?: Omit<Options, 'data'>;
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

const baseUrl = process.env.NEXT_PUBLIC_API_SERVER;
export const baseHeader: Headers = {
  'Content-Type': 'application/json',
};

const apiClient = {
  get: async <T = unknown>(url: string, config?: Omit<Options, 'data'>): Promise<Response<T>> => {
    const fetchUrl = `${baseUrl}${url}${paramToString(config?.params)}`;
    const fetchHeader = { ...baseHeader, ...config?.headers };

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
  post: async <T = unknown, B = unknown>(
    url: string,
    config?: Options<B>,
  ): Promise<Response<T>> => {
    const fetchUrl = `${baseUrl}${url}${paramToString(config?.params)}`;
    const fetchHeader = new Headers({
      ...baseHeader,
      'Content-Type': 'application/json;charset=UTF-8',
      ...config?.headers,
    });
    const result = await fetch(fetchUrl, {
      method: 'POST',
      credentials: 'include',
      headers: fetchHeader,
      body: JSON.stringify(config?.data),
      ...config,
    });
    if (result.ok) {
      return result.json();
    }

    throw result.json();
  },
  patch: async <T = unknown, B = unknown>(
    url: string,
    config?: Options<B>,
  ): Promise<Response<T>> => {
    const fetchUrl = `${baseUrl}${url}${paramToString(config?.params)}`;
    const fetchHeader = new Headers({
      ...baseHeader,
      'Content-Type': 'application/json;charset=UTF-8',
      ...config?.headers,
    });
    const result = await fetch(fetchUrl, {
      method: 'PATCH',
      credentials: 'include',
      headers: fetchHeader,
      body: JSON.stringify(config?.data),
      ...config,
    });

    if (result.ok) {
      return result.json();
    }

    throw result.json();
  },
  delete: async <T = unknown>(
    url: string,
    config?: Omit<Options, 'data'>,
  ): Promise<Response<T>> => {
    const fetchUrl = `${baseUrl}${url}${paramToString(config?.params)}`;
    const fetchHeader = new Headers({ ...baseHeader, ...config?.headers });

    const result = await fetch(fetchUrl, {
      method: 'DELETE',
      credentials: 'include',
      headers: fetchHeader,
      ...config,
    });

    if (result.ok) {
      return result.json();
    }

    throw result.json();
  },
} as const;

export default apiClient;
