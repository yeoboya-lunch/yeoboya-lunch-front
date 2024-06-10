import { StarFilledIcon } from '@radix-ui/react-icons';

import { cn } from '@/app/_lib/utils';

type Props = {
  score: number;
};
const RateBox = ({ score }: Props) => {
  return (
    <article className="flex">
      {Array.from({ length: 5 }, (_, index) => {
        return (
          <StarFilledIcon
            key={index}
            className={cn('h-6 w-6', index < score ? 'text-secondary' : 'text-muted')}
          />
        );
      })}
    </article>
  );
};

export default RateBox;
