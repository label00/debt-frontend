import { baseFetch } from '../../lib';

type UserResponse = {
  accessToken: string;
  email: string;
  name: string;
  id: string;
};

export const auth = (email: string, password: string): Promise<UserResponse> =>
  baseFetch(`/auth/login`, 'POST', { email, password })
    .then((data) => data.json())
    .then((data) => ({ ...data, accessToken: data.access_token }));
