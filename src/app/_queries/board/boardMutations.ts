import { useMutation, useQueryClient } from '@tanstack/react-query';
import { boardKeys } from 'app/_queries/board/boardQueryKeys';
import { Board, Reply } from 'domain/board';
import { User } from 'domain/user';

import useFetchWrapper from '@/libs/client/fetch-wrapper';

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
  const { post } = useFetchWrapper();

  return useMutation({
    mutationFn: (data: BoardWriteParams) => post({ url: `/board/write`, data: data }),
  });
};

type ReplyWriteParams = {
  email: User['email'];
  boardId: Board['boardId'];
  content: Reply['content'];
};
export const useReplyWrite = (boardId: number) => {
  const { post } = useFetchWrapper();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReplyWriteParams) => post({ url: `/board/reply/write`, data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: boardKeys.detail(boardId) }),
  });
};
