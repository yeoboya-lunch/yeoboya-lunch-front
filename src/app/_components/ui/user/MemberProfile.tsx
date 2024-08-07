import { HTMLAttributes, ReactNode } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/_components/ui/Avatar';
import { cn } from '@/app/_lib/utils';

type Props = {
  src?: string;
  alt: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

const MemberProfile = ({ src, alt, className, children, ...rest }: Props) => {
  return (
    <Avatar className={cn('h-8 w-8 cursor-pointer', className)} {...rest}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{children}</AvatarFallback>
    </Avatar>
  );
};

export default MemberProfile;
