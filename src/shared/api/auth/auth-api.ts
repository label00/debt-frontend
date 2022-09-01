import { baseFetch } from '../../lib';

type UserResponse = {
  access_token: string;
  email: string;
  name: string;
  id: string;
};

export const auth = (email: string, password: string): Promise<UserResponse> =>
  baseFetch(`/auth/login`, 'POST', { email, password }).then((data) => data.json());
