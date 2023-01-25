import React from 'react';

const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJra2xhdGg5OTE5QG5hdmVyLmNvbSIsImp0aSI6ImIyZjQ4ZGY0LTY2ZTYtNGE2OC04MmNlLTA3NTRkNjQ5ZTU2MiIsImlzcyI6Inllb2JveWEiLCJpYXQiOjE2NzQ2MDYyMjMsImV4cCI6MTY3NDY5MjYyMywiYXV0aCI6IlJPTEVfVVNFUiJ9.9722OWdhAb442Jv4GXTprXiQ6AE4C5M9AnBaqAlR6pE';

export function useFetch<T = any>(url: string, method: string, data?: string) {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);

  fetch(process.env.NEXT_PUBLIC_API_SERVER + url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  return {response, error};
}

// const useFetch = (url: string, method: string, data?: string) => {
//   const [response, setResponse] = React.useState(null);
//   const [error, setError] = React.useState(null);
//
//   fetch(process.env.NEXT_PUBLIC_API_SERVER + url, {
//     method: method,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify(data),
//   }).then((res) => res.json());
//
//   return {response, error};
// };
//
// export {useFetch};
