export const memberKeys = {
  all: () => ['user'] as const,
  lists: () => [...memberKeys.all(), 'list'] as const,
  list: (filters: { page: number; size: number }) => [...memberKeys.lists(), filters] as const,
  details: () => [...memberKeys.all(), 'detail'] as const,
  detail: (loginId: string | undefined) => [...memberKeys.details(), loginId] as const,
};
