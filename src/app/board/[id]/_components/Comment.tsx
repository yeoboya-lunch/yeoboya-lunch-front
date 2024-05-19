import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from 'app/_components/ui/Avatar';
import { cn } from 'app/_lib/utils';
import CommentReply from 'app/board/[id]/_components/CommentReply';
import type { Reply } from 'domain/board';
import { useState } from 'react';

type Props = {
  comment: Reply;
};

const Comment = ({ comment }: Props) => {
  const { writer, content } = comment;
  const [openReply, setOpenReply] = useState(false);
  return (
    <article className="mb-3 flex flex-col gap-2">
      <div className="flex flex-grow gap-3">
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage />
          <AvatarFallback />
        </Avatar>
        <div className="flex flex-grow flex-col gap-2">
          <span className="w-fit cursor-pointer text-sm font-medium">{writer}</span>
          <p className="whitespace-pre">{content}</p>
          <div className="flex">
            <div
              className={cn(
                'hover:trasition-all flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 duration-200 ease-in hover:bg-secondary',
                openReply && 'bg-secondary',
              )}
              onClick={() => setOpenReply(!openReply)}
            >
              <ChatBubbleIcon className="h-4 w-4" />
              답글 수
            </div>
          </div>
        </div>
      </div>
      {openReply && <CommentReply reply={comment} />}
    </article>
  );
};

export default Comment;
