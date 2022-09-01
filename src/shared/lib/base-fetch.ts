import { API_URL } from '../env';
import { getSavedToken } from '../api';

export const baseFetch = (path: string, method = 'GET', body?: Record<string, any> | []) => {
  const accessToken = getSavedToken();
  return fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: body ? JSON.stringify(body) : null,
  }).then((res) => (res.ok ? res : Promise.reject(res)));
};
