import { AxiosRequestConfig } from 'axios';

export type Url = string;
export type Headers = { [key: string]: string };
export type Config<B> = AxiosRequestConfig<B>;
export type ApiSearch = { [key: string]: string | number | undefined };

export type PaginationOptions = {
  page?: number;
  size?: number;
};
