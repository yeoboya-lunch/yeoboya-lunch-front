import { User } from '@/domain/user';

export const historyKeys = {
  all: () => ['history'] as const,
  joins: () => [...historyKeys.all(), 'join'] as const,
  join: (email: User['email']) => [...historyKeys.joins(), email] as const,
  recruits: () => [...historyKeys.all(), 'recruit'] as const,
  recruit: (email: User['email']) => [...historyKeys.recruits(), email] as const,
} as const;
