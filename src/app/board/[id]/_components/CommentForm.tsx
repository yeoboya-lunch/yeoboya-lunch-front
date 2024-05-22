import type { Property } from 'csstype';
import { ChangeEventHandler, HTMLAttributes, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import { Button } from '@/app/_components/ui/Button';
import { Textarea } from '@/app/_components/ui/Textarea';
import { useReplyWrite } from '@/app/_queries/board/boardMutations';
import memberAtom from '@/libs/recoil/member';

type FormProps = {
  reply: string;
};
type Props = { boardId: number } & HTMLAttributes<HTMLFormElement>;
const CommentForm = ({ boardId, ...props }: Props) => {
  const { register, handleSubmit, setValue } = useForm<FormProps>();
  const [textareaHeight, setTextareaHeight] = useState<Property.Height<string | number>>('auto');
  const { mutate } = useReplyWrite(boardId);
  const { email } = useRecoilValue(memberAtom);

  const resize: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (textareaHeight !== e.target.scrollHeight) {
      e.target.style.height = 'auto';
    }
    setTextareaHeight(e.target.scrollHeight);
  };

  const handleReply: SubmitHandler<FormProps> = ({ reply }) => {
    mutate(
      { content: reply, email: email ?? '', boardId: boardId },
      {
        onSuccess: () => setValue('reply', ''),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(handleReply)} {...props}>
      <Textarea
        {...register('reply')}
        className="mb-4 min-h-24 resize-none overflow-hidden"
        placeholder="지금 댓글을 달아보세요!"
        required
        onChange={resize}
        style={{ height: textareaHeight }}
        rows={1}
      />
      <div className="flex flex-row-reverse">
        <Button className="mb-10">댓글 작성</Button>
      </div>
    </form>
  );
};

export default CommentForm;
