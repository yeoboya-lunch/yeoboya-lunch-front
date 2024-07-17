import { Cross2Icon } from '@radix-ui/react-icons';
import * as React from 'react';
import { InputHTMLAttributes } from 'react';

import { Badge } from '@/app/_components/ui/Badge';
import { Input } from '@/app/_components/ui/Input';
import { HashTag } from '@/domain/board';

type Props = {
  tags: HashTag[];
  // 당장은 구현 X
  deleteTag?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

const TagInput = ({ tags, deleteTag, ...props }: Props) => {
  return (
    <div>
      <div className="flex flex-wrap gap-x-1.5 gap-y-1">
        {tags.length > 0 &&
          tags.map(({ tag }, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="gap-1 rounded-full py-1 text-muted-foreground"
            >
              {tag}
              <Cross2Icon className="cursor-pointer" onClick={deleteTag} />
            </Badge>
          ))}
        <Input variant="borderNone" className="w-36" {...props} />
      </div>
    </div>
  );
};
export { TagInput };
