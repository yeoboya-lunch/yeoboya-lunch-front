import { useMutation, useQueryClient } from '@tanstack/react-query';
import { boardKeys } from 'app/_queries/board/boardQueryKeys';
import apiClient from 'client/apiClient';
import { Board, Comment } from 'domain/board';
import { User } from 'domain/user';

type BoardWriteParams = Pick<Board, 'email' | 'title' | 'hashTag' | 'content'> &
  (
    | {
        pin: number;
        secret: true;
      }
    | {
        secret?: false;
        pin?: never;
      }
  );
export const useBoardWrite = () => {
  return useMutation({
    mutationFn: (data: BoardWriteParams) => apiClient.post(`/board/write`, { data }),
  });
};

type ReplyWriteParams = {
  email: User['email'];
  boardId: Board['boardId'];
  content: Comment['content'];
  parentReplyId?: Comment['replyId'];
};
export const useReplyWrite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReplyWriteParams) => apiClient.post(`/board/reply/write`, { data }),
    onSuccess: (data, values) =>
      queryClient.invalidateQueries({ queryKey: boardKeys.detail(values.boardId) }),
  });
};
