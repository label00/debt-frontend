import { API_URL } from '../env';

export const baseFetch = (path: string, method = 'GET', body?: Record<string, unknown> | []) =>
  fetch(`${API_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : null,
  }).then((res) => (res.ok ? res : Promise.reject(res)));
