import { baseFetch } from '../../lib';
import { User } from './types';

const getUsers = async (): Promise<User[]> => {
  const res = await baseFetch(`/users`);
  return await res.json();
};

const getUserById = async (id: string): Promise<User> => {
  const res = await baseFetch(`/users/${id}`);
  return await res.json();
};

export { getUsers, getUserById };
