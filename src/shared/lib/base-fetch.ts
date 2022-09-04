import { API_URL } from '../env';
import { getSavedToken } from '../api';
import { createEvent } from 'effector';

export const unauthorizedError = createEvent();

export const baseFetch = (path: string, method = 'GET', body?: Record<string, unknown>) => {
  const accessToken = getSavedToken();
  return fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: body ? JSON.stringify(body) : null,
  }).then((res) => {
    if (!res.ok && res.status === 401) {
      unauthorizedError();
    }

    return res.ok ? res : Promise.reject(res);
  });
};
