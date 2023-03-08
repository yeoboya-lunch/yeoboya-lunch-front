import {useState} from 'react';

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(url: string): UseMutationResult<T> {
  const [state, setSate] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const accessToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJra2xhdGg5OTE5QG5hdmVyLmNvbSIsImp0aSI6ImIyZjQ4ZGY0LTY2ZTYtNGE2OC04MmNlLTA3NTRkNjQ5ZTU2MiIsImlzcyI6Inllb2JveWEiLCJpYXQiOjE2NzQ2MDYyMjMsImV4cCI6MTY3NDY5MjYyMywiYXV0aCI6IlJPTEVfVVNFUiJ9.9722OWdhAb442Jv4GXTprXiQ6AE4C5M9AnBaqAlR6pE';
  function mutation(data: any) {
    setSate((prev) => ({...prev, loading: true}));
    fetch(process.env.NEXT_PUBLIC_API_SERVER + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setSate((prev) => ({...prev, data, loading: false})))
      .catch((error) => setSate((prev) => ({...prev, error, loading: false})));
  }
  return [mutation, {...state}];
}
