import UserProfile from '@/app/_components/ui/user/UserProfile';

type Props = {
  users: unknown[];
  count: number;
};

const OverlapProfileGroup = ({ users, count }: Props) => {
  const showGroup = users.slice(0, count);
  const restGroupCount = users.slice(count).length;

  return (
    <div className="flex space-x-[-8px]">
      {showGroup.map((user, index, array) => (
        <UserProfile
          key={index}
          image={user.image}
          alt={user.name}
          className="h-6 w-6"
          style={{ zIndex: array.length - index }}
        />
      ))}
      {restGroupCount > 0 && (
        <UserProfile alt={'기본 이미지'} className="h-6 w-6 text-xs">
          +
        </UserProfile>
      )}
    </div>
  );
};

export default OverlapProfileGroup;
