import { Member } from 'domain/member';

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
  replyCount: number;
  likeCount: number;
  clickLiked: boolean;
  secret: boolean;
} & Pick<Member, 'loginId' | 'name'>;

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
