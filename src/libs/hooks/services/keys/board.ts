const boardKeys = {
  all: () => ['board'],
  list: () => [...boardKeys.all(), 'list'],
  ListFilteredByEmail: (email?: string) => [...boardKeys.list(), email],
  details: () => [...boardKeys.all(), 'detail'],
  detail: (boardId: string) => [...boardKeys.details(), boardId],
  insert: () => [...boardKeys.all(), 'write'],
};

export default boardKeys;
