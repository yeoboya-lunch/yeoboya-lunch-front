import { PaginationOptions } from '@/client/ApiClient';

export type ShopListFilter = {
  sort: string;
} & PaginationOptions;

export const shopKeys = {
  all: () => ['shop'] as const,
  lists: () => [...shopKeys.all(), 'list'] as const,
  list: (filters: Required<ShopListFilter>) => [...shopKeys.lists(), { ...filters }] as const,
};
