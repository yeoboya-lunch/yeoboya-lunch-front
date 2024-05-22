'use client';

import { useBoardQuery } from 'app/_queries/board/boardQueries';
import Comment from 'app/board/[id]/_components/Comment';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/_components/ui/Avatar';
import { Badge } from '@/app/_components/ui/Badge';
import CommentForm from '@/app/board/[id]/_components/CommentForm';
import Layout from '@/components/layout';

type Props = {
  params: {
    id: number;
  };
};
const BoardDetailPage = ({ params: { id } }: Props) => {
  const { data } = useBoardQuery(id);

  return (
    <Layout canGoBack>
      <div className="p-3">
        <h2 className="mb-4 text-4xl">{data?.title}</h2>
        <div className="mb-2 flex items-center space-x-3">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage />
            <AvatarFallback />
          </Avatar>
          <p className="cursor-pointer text-sm font-medium">{data?.name}</p>
        </div>
        <div className="mb-8 flex">
          {data?.hashTag.map(({ tag }, index) => (
            <Badge
              variant="secondary"
              key={index}
              className="mr-2 rounded-xl text-secondary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <p className="mb-24">{data?.content}</p>
        <div className="mb-2 text-lg">{data?.replyCount}개의 댓글</div>
        <CommentForm boardId={id} />
        {data?.replies &&
          data.replies.map((reply, index) => {
            return <Comment key={index} boardId={id} comment={reply} />;
          })}
      </div>
    </Layout>
  );
};

export default BoardDetailPage;
