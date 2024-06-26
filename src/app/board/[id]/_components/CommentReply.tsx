import { Avatar, AvatarFallback, AvatarImage } from 'app/_components/ui/Avatar';
import { Comment } from 'domain/board';

type Props = {
  reply: Comment;
};
const CommentReply = ({ reply: { writer, content } }: Props) => {
  return (
    <div className="flex flex-grow gap-3">
      <Avatar className="h-8 w-8 cursor-pointer">
        <AvatarImage />
        <AvatarFallback />
      </Avatar>
      <div className="flex flex-grow flex-col gap-2">
        <span className="w-fit cursor-pointer text-sm font-medium">{writer}</span>
        <p className="whitespace-pre">{content}</p>
      </div>
    </div>
  );
};

export default CommentReply;
