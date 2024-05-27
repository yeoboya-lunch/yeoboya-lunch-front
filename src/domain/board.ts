import { User } from '@/domain/user';

export type Board = {
  boardId: number;
  title: string;
  content: string;
  createDate: string;
  files: File[];
  hashTag: HashTag[];
  replies: (Comment & {
    childReplies?: CommentReply[];
  })[];
  replyCount: 0;
} & Pick<User, 'email' | 'name'>;

export type HashTag = {
  tag: string;
};

export type Comment = {
  content: string;
  date: string;
  replyId: number;
  writer: string;
};

type CommentReply = {
  parentId: number;
} & Comment;
