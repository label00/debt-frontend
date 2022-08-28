import { User } from '../users/types';
import { baseFetch } from '../../lib';

type UserResponse = {
  accessToken: string;
  user: User;
};

export const auth = (email: string, password: string): Promise<UserResponse> =>
  baseFetch(`/login`, 'POST', { email, password }).then((data) => data.json());
