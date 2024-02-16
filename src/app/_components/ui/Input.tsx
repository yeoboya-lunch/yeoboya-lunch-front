import * as React from 'react';

import { cn } from '@/app/_lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  'flex h-9 w-full bg-transparent text-sm transition-colors file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'px-3 py-1 rounded-md border border-input shadow-sm file:border-0 focus-visible:ring-ring focus-visible:ring-1',
        borderNone: 'shadow-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
