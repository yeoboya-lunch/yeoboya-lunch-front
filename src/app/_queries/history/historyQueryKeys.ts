import { Member } from 'domain/member';

export const historyKeys = {
  all: () => ['history'] as const,
  joins: () => [...historyKeys.all(), 'join'] as const,
  join: (email: Member['email']) => [...historyKeys.joins(), email] as const,
  recruits: () => [...historyKeys.all(), 'recruit'] as const,
  recruit: (email: Member['email']) => [...historyKeys.recruits(), email] as const,
} as const;
