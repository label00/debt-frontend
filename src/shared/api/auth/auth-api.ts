import { User } from '../users/types';
import { baseFetch } from '../../lib';

type UserResponse = {
  accessToken: string;
  user: User;
}

export const auth = (email: string, password: string): Promise<UserResponse> =>
  baseFetch(`/login`, 'POST', { email, password })
    .then(data => data.json())

type RegisterResponse = {
  accessToken: string;
  user: User;
}

export const register = (email: string, password: string, name: string): Promise<RegisterResponse> =>
  baseFetch('/register', 'POST', { email, password, name })
    .then(data => data.json())


