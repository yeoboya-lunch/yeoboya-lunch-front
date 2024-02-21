export const orderKeys = {
  all: () => ['order'],
  list: (filter: { page: number; size: number; email?: string }) => [
    ...orderKeys.all(),
    'list',
    filter,
  ],
  details: () => [...orderKeys.all(), 'detail'],
  detail: (orderId: string) => [...orderKeys.details(), orderId],
  insert: () => [...orderKeys.all(), 'recruit'],
};
