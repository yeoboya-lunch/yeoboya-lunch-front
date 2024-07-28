import { ClassNameValue } from 'tailwind-merge';

import ProfileImg from '@/app/_components/ui/user/ProfileImg';
import { cn } from '@/app/_lib/utils';
import { Member } from '@/domain/member';

type Props = {
  member: Member | undefined;
  className?: ClassNameValue;
};
const MemberProfile = ({ member, className }: Props) => {
  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <ProfileImg className="h-16 w-16" />
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{member?.loginId}</span>
        <span className="text-sm text-muted-foreground">{member?.name}</span>
      </div>
    </div>
  );
};

export default MemberProfile;
