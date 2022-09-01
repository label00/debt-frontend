import { baseFetch } from '../../lib';
import { User } from './types';

export const getUsers = async (): Promise<User[]> => {
  const res = await baseFetch(`/users`);
  return await res.json();
};
