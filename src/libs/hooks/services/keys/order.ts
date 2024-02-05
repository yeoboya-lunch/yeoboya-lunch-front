export const orderKeys = {
  all: () => ['order'],
  list: () => [...orderKeys.all(), 'list'],
  ListFilteredByEmail: (email?: string) => [...orderKeys.list(), email],
  details: () => [...orderKeys.all(), 'detail'],
  detail: (orderId: string) => [...orderKeys.details(), orderId],
  insert: () => [...orderKeys.all(), 'recruit'],
};
