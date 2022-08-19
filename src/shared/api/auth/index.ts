import { API_URL } from '../../env';

export const auth = (email: string, password: string) =>
  fetch(`${API_URL}/users?email=${email}&password=${password}`)
    .then(data => data.json())
    .then(([user]) => user ? user : new Error('Нет пользывателя'))
