import ProfileImg from '@/app/_components/ui/user/ProfileImg';

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
        <ProfileImg
          key={index}
          src={user.image}
          alt={user.name}
          className="h-6 w-6"
          style={{ zIndex: array.length - index }}
        />
      ))}
      {restGroupCount > 0 && (
        <ProfileImg alt={'기본 이미지'} className="h-6 w-6 text-xs">
          +
        </ProfileImg>
      )}
    </div>
  );
};

export default OverlapProfileGroup;
