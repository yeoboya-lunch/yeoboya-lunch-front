import { Member } from 'domain/member';

export const historyKeys = {
  all: () => ['history'] as const,
  joins: () => [...historyKeys.all(), 'join'] as const,
  join: (loginId: Member['loginId']) => [...historyKeys.joins(), loginId] as const,
  recruits: () => [...historyKeys.all(), 'recruit'] as const,
  recruit: (loginId: Member['loginId']) => [...historyKeys.recruits(), loginId] as const,
} as const;
