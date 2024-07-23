import MemberProfile from 'app/_components/ui/user/MemberProfile';

type Props = {
  users: { name: string; image: string }[];
  count: number;
};

const OverlapProfileGroup = ({ users, count }: Props) => {
  const showGroup = users.slice(0, count);
  const restGroupCount = users.slice(count).length;

  return (
    <div className="flex space-x-[-8px]">
      {showGroup.map((user, index, array) => (
        <MemberProfile
          key={index}
          src={user.image}
          alt={user.name}
          className="h-6 w-6"
          style={{ zIndex: array.length - index }}
        />
      ))}
      {restGroupCount > 0 && (
        <MemberProfile alt={'기본 이미지'} className="h-6 w-6 text-xs">
          +
        </MemberProfile>
      )}
    </div>
  );
};

export default OverlapProfileGroup;
