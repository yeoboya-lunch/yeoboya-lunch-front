import { PaginationOptions } from 'client/apiClient';

export type OrderListFilter = {
  orderEmail?: string;
  startDate: string;
  endDate: string;
} & PaginationOptions;

export const orderKeys = {
  all: () => ['order'] as const,
  lists: () => [...orderKeys.all(), 'list'] as const,
  list: (filters: Required<OrderListFilter>) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all(), 'detail'] as const,
  detail: (orderId: string) => [...orderKeys.details(), orderId] as const,
};
