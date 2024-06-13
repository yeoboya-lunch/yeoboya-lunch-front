import { ButtonHTMLAttributes } from 'react';

import { cls } from '@/libs/client/utils';

type ButtonProps = {
  large?: boolean;
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ large = false, onClick, text, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cls(
        'w-full rounded-md border border-transparent bg-primary px-4 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
        large ? 'py-3 text-base' : 'py-2 text-sm ',
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
