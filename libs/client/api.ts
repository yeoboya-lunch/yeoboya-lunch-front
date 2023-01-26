import React from 'react';
import axios, {AxiosResponse} from 'axios';

const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxQG5hdmVyLmNvbSIsImp0aSI6ImI0OGJiZTUzLTM5ZTAtNGE5ZS1hNDRlLTIyM2NlNzI0ZDJmOSIsImlzcyI6Inllb2JveWEiLCJpYXQiOjE2NzQ2OTM4NjUsImV4cCI6MTY3NDc4MDI2NSwiYXV0aCI6IlJPTEVfVVNFUiJ9.1o3BqapaSoIjRGGZ9iVdHrW8dFUPVEQMr-GEpmybliM';

function get<T = any>(url: string, params?: {}): Promise<AxiosResponse> {
  return axios
    .get(url, {
      baseURL: process.env.NEXT_PUBLIC_API_SERVER,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      params: params,
      timeout: 0,
    })
    .then((r: AxiosResponse<any>) => r)
    .catch((reason) => reason);
}
//
// function post<T = any>(url: string, data?: {}): Promise<AxiosResponse> {
//   return axios.post(url, {
//     baseURL: process.env.NEXT_PUBLIC_API_SERVER,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: data,
//     timeout: 0,
//     responseType: 'json',
//   });
//   .then((r: AxiosResponse<any>) => r)
//   .catch((reason) => reason);
// }

interface PostParams {
  url: string;
  data: any;
}

function post({url, data}: PostParams): Promise<AxiosResponse> {
  return fetch(process.env.NEXT_PUBLIC_API_SERVER + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then((response) => response.json().catch(() => {}));
}

export {get, post};
