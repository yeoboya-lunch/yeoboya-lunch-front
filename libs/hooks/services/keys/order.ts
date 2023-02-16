export const orderKeys = {
  all: () => ['order'],
  list: () => [...orderKeys.all(), 'list'],
  details: () => [...orderKeys.all(), 'detail'],
  detail: (orderId: string) => [...orderKeys.details(), orderId],
  insert: () => [...orderKeys.all(), 'recruit'],
};
