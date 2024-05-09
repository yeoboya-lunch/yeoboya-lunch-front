import { User } from '@/domain/user';

export type Board = {
  boardId: number;
  title: string;
  content: string;
  createDate: string;
  files: File[];
  hashTags: HashTag[];
  secret: boolean;
  replies: Reply[];
  replyCount: 0;
} & Pick<User, 'email' | 'name'>;

export type HashTag = {
  tag: string;
};

export type Reply = {
  content: string;
  date: string;
  replyId: number;
  writer: string;
};
