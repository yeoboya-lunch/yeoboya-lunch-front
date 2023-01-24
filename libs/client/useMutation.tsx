import {useState} from 'react';

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}
type UseMutationResult = [(data: any) => void, UseMutationState];

export default function useMutations(url: string): UseMutationResult {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  function mutation(data: any) {
    setLoading(true);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJra2xhdGg5OTE5QG5hdmVyLmNvbSIsImp0aSI6IjRmZjkzMWNjLTBhZDQtNDc1Ni1hMTQ4LTA5YWZkZTVlZjc4MyIsImlzcyI6Inllb2JveWEiLCJpYXQiOjE2NzQ0NTE4NzUsImV4cCI6MTY3NDUzODI3NSwiYXV0aCI6IlJPTEVfVVNFUiJ9.mOfZ9jcPBY3J_8t_gen80V4PcPXlix-uc_g0xTtUguQ`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }
  return [mutation, {loading, data, error}];
}