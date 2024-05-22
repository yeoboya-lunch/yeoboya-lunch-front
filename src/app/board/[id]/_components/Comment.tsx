import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from 'app/_components/ui/Avatar';
import CommentReply from 'app/board/[id]/_components/CommentReply';
import type { Reply } from 'domain/board';
import { HTMLAttributes, ReactNode, useState } from 'react';

import { cn } from '@/app/_lib/utils';
import CommentForm from '@/app/board/[id]/_components/CommentForm';

type Props = {
  comment: Reply;
  boardId: number;
};

const Comment = ({ comment, boardId }: Props) => {
  const { writer, content } = comment;
  const [openReply, setOpenReply] = useState(false);
  return (
    <section className="mb-3 flex flex-col gap-2">
      <CommentBox>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage />
          <AvatarFallback />
        </Avatar>
        <div className="flex flex-grow flex-col gap-2">
          <span className="w-fit cursor-pointer text-sm font-medium">{writer}</span>
          <p className="whitespace-pre">{content}</p>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <ChatBubbleIcon className="h-4 w-4" />6
            </div>
            <button
              type="button"
              className={cn(
                'hover:trasition-all cursor-pointer rounded-lg px-2 py-1  duration-200 ease-in hover:bg-secondary',
                openReply && 'bg-secondary',
              )}
              onClick={() => setOpenReply(!openReply)}
            >
              답글 달기
            </button>
          </div>
        </div>
      </CommentBox>
      <ReplyBox className="flex flex-col gap-2">
        <CommentReply reply={comment} />
        {openReply && <CommentForm boardId={boardId} />}
      </ReplyBox>
    </section>
  );
};

const CommentBox = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-grow gap-3">{children}</div>
);

const ReplyBox = ({
  children,
  className,
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('ml-11', className)}>{children}</div>
);

export default Comment;
