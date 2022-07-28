import { API_URL } from '../env';
import { getSavedToken } from '../api';
import { createEvent } from 'effector';

export const unauthorizedError = createEvent();

const baseFetch = (path: string, method = 'GET', body?: Record<string, unknown>): Promise<Response> => {
  const accessToken = getSavedToken();

  return fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: body ? JSON.stringify(body) : null,
  })
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .catch((res) => {
      if (!res.ok && res.status === 401) {
        unauthorizedError();
      }
      return Promise.reject(res);
    });
};

export { baseFetch };
