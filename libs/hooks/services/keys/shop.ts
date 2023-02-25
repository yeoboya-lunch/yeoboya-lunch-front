export const shopKeys = {
  all: () => ['shop'],
  list: () => [...shopKeys.all(), 'list'],
  details: () => [...shopKeys.all(), 'detail'],
  detail: (shopId: string) => [...shopKeys.details(), shopId],
  insert: () => [...shopKeys.all(), 'register'],
};