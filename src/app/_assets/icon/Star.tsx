import { StarFilledIcon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { cva, VariantProps } from 'class-variance-authority';
import { RefAttributes } from 'react';

import { cn } from '@/app/_lib/utils';

const starVariants = cva('h-10 w-10', {
  variants: {
    variant: {
      full: 'text-yellow-400',
      empty: 'text-gray-400',
    },
  },
  defaultVariants: {
    variant: 'full',
  },
});

export type StarProps = IconProps &
  RefAttributes<SVGSVGElement> &
  VariantProps<typeof starVariants>;

const Star = ({ variant, className, ...props }: StarProps) => {
  return <StarFilledIcon className={cn(starVariants({ variant, className }))} {...props} />;
};

export default Star;
