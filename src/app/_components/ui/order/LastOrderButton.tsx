import { Button } from '@/app/_components/ui/Button';
import { cn } from '@/app/_lib/utils';

type Props = {
  trigger: (...args) => void;
};

const LastOrderButton = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'mt-auto flex flex-col content-between gap-8 border-t-[1px] bg-white p-2',
        className,
      )}
    >
      <div className="flex justify-between">
        <dt className="text-lg font-semibold">총 금액</dt>
        <dd className="text-lg font-semibold">얼마? 원</dd>
      </div>
      <Button className="w-full">모집 완료</Button>
    </div>
  );
};

export default LastOrderButton;
