'use client';

import { ChatBubbleIcon, HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { cn } from 'app/_lib/utils';
import { useBoardLike, useBoardUnlike } from 'app/_queries/board/boardMutations';
import { useBoardQuery } from 'app/_queries/board/boardQueries';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/_components/ui/Avatar';
import { Badge } from '@/app/_components/ui/Badge';
import BoardComment from '@/app/board/[id]/_components/BoardComment';
import CommentForm from '@/app/board/[id]/_components/CommentForm';
import Layout from '@/components/layout';

type Props = {
  params: {
    id: number;
  };
};
const BoardDetailPage = ({ params: { id } }: Props) => {
  const { data } = useBoardQuery(id);
  const { mutate: onLike } = useBoardLike(id);
  const { mutate: onUnlike } = useBoardUnlike(id);

  if (!data) {
    return null;
  }

  const { title, hashTag, content, replies, name, replyCount, clickLiked, likeCount } = data;

  const handleLikeClick = () => {
    if (clickLiked) return;
    onLike();
  };

  const handleUnlikeClick = () => {
    if (!clickLiked) return;
    onUnlike();
  };

  return (
    <Layout title="자유게시판" className="p-4" canGoBack>
      <h2 className="mb-4 text-4xl">{title}</h2>
      <div className="mb-2 flex items-center space-x-3">
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage />
          <AvatarFallback />
        </Avatar>
        <p className="cursor-pointer text-sm font-medium">{name}</p>
      </div>
      <div className="mb-8 flex">
        {hashTag.map(({ tag }, index) => (
          <Badge variant="secondary" key={index} className="mr-2 rounded-xl">
            {tag}
          </Badge>
        ))}
      </div>
      <p className="min-h-96">{content}</p>
      <div className="mb-2 flex justify-end gap-4">
        <div
          className={cn(
            'flex w-14 cursor-pointer items-center justify-between gap-1 rounded px-2 py-1',
            'hover:bg-muted',
          )}
          onClick={clickLiked ? handleUnlikeClick : handleLikeClick}
        >
          {clickLiked ? (
            <HeartFilledIcon className="h-5 w-5 text-accent" />
          ) : (
            <HeartIcon className="h-5 w-5" />
          )}
          {likeCount}
        </div>
        <div
          className={cn(
            'flex w-14 cursor-pointer items-center justify-between gap-1 rounded px-2 py-1',
            'hover:bg-muted',
          )}
        >
          <ChatBubbleIcon className="h-5 w-5" />
          {replyCount}
        </div>
      </div>
      <CommentForm boardId={id} />
      {replies.map((reply, index) => {
        return <BoardComment key={index} boardId={id} comment={reply} />;
      })}
    </Layout>
  );
};

export default BoardDetailPage;
