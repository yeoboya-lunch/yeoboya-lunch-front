import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/app/_components/ui/Button';

type Props = {
  value: number;
  onIncrement: (value?: number) => void;
  onDecrement: (value?: number) => void;
};

const Counter = ({ value = 0, onIncrement, onDecrement }: Props) => {
  return (
    <div className="flex items-center justify-between rounded-md ring-1 ring-input">
      <Button
        variant="ghost"
        className="rounded-e-none text-2xl"
        onClick={() => onDecrement(value)}
      >
        <MinusIcon />
      </Button>
      <span className="w-8 text-center">{value}</span>
      <Button
        variant="ghost"
        className="rounded-s-none text-2xl"
        onClick={() => onIncrement(value)}
      >
        <PlusIcon />
      </Button>
    </div>
  );
};

export default Counter;
