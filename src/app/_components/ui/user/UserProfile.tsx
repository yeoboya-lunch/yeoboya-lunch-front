import { Avatar, AvatarFallback, AvatarImage } from '@/app/_components/ui/Avatar';
import { HTMLAttributes } from 'react';
import { cn } from '@/app/_lib/utils';

type Props = {
  image: string;
  alt: string;
} & HTMLAttributes<HTMLImageElement>;

const UserProfile = ({ image, alt, className, ...rest }: Props) => {
  return (
    <Avatar className={cn('h-8 w-8 cursor-pointer', className)} {...rest}>
      <AvatarImage src={image} alt={alt} />
      <AvatarFallback />
    </Avatar>
  );
};

export default UserProfile;
