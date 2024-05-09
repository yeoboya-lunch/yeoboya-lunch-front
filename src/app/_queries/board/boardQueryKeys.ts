import { PaginationOptions } from '@/client/ApiClient';

export const boardKeys = {
  all: () => ['board'] as const,
  lists: () => [...boardKeys.all(), 'list'] as const,
  list: (filter: PaginationOptions) => [...boardKeys.lists(), filter] as const,
  details: () => [...boardKeys.all(), 'detail'] as const,
  detail: (boardId: number) => [...boardKeys.details(), boardId] as const,
} as const;
