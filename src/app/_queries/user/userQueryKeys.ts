export const userKeys = {
  all: () => ['user'] as const,
  lists: () => [...userKeys.all(), 'list'] as const,
  list: (filters: { page: number; size: number }) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all(), 'detail'] as const,
  detail: (email: string | undefined) => [...userKeys.details(), email] as const,
};
