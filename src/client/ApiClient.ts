export type Url = string;
export type Headers = { [key: string]: string };
export type Config = {
  headers?: Headers;
};
export type Params = URLSearchParams;

export type PaginationOptions = {
  page?: number;
  size?: number;
};
