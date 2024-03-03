import { User } from '@/domain/user';

export type Board = {
  boardId: number;
  title: string;
  content: string;
  createDate: string;
  files: File[];
  hashTags: HashTag[];
  secret: boolean;
} & Omit<User, 'password'>;

export type HashTag = {
  tag: string;
};
