import { Avatar, AvatarFallback, AvatarImage } from '@/app/_components/ui/Avatar';
import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/app/_lib/utils';

type Props = {
  image?: string;
  alt: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLImageElement>;

const UserProfile = ({ image, alt, className, children, ...rest }: Props) => {
  return (
    <Avatar className={cn('h-8 w-8 cursor-pointer', className)} {...rest}>
      <AvatarImage src={image} alt={alt} />
      <AvatarFallback>{children}</AvatarFallback>
    </Avatar>
  );
};

export default UserProfile;
