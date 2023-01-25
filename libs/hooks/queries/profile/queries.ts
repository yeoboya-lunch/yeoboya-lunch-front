import {useQuery} from 'react-query';
import {useFetch} from '@libs/client/useFetch';

const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJra2xhdGg5OTE5QG5hdmVyLmNvbSIsImp0aSI6ImIyZjQ4ZGY0LTY2ZTYtNGE2OC04MmNlLTA3NTRkNjQ5ZTU2MiIsImlzcyI6Inllb2JveWEiLCJpYXQiOjE2NzQ2MDYyMjMsImV4cCI6MTY3NDY5MjYyMywiYXV0aCI6IlJPTEVfVVNFUiJ9.9722OWdhAb442Jv4GXTprXiQ6AE4C5M9AnBaqAlR6pE';

type State = 'all' | 'open' | 'done';

export const useMemberQuery = (state: State) => {
  let useFetch1 = useFetch('/member/1@naver.com', 'GET');
  return useQuery({
    queryKey: ['todos', state],
    queryFn: () => useFetch1,
  });
};
