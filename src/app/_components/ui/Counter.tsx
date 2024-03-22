import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/app/_components/ui/Button';

type Props = {
  value: number;
  updateValue: (value: number) => void;
};

const Counter = ({ value, updateValue }: Props) => {
  return (
    <div className="flex items-center justify-between rounded-md ring-1 ring-input">
      <Button
        variant="ghost"
        className="rounded-e-none text-2xl"
        onClick={() => updateValue(value - 1)}
      >
        <MinusIcon />
      </Button>
      <span className="w-8 text-center">{value}</span>
      <Button
        variant="ghost"
        className="rounded-s-none text-2xl"
        onClick={() => updateValue(value + 1)}
      >
        <PlusIcon />
      </Button>
    </div>
  );
};

export default Counter;
