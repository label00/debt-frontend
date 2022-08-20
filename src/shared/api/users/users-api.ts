import { baseFetch } from '../../lib';
import { getSavedUser } from '../auth';

export const getUsers = async () => {
  const { id } = getSavedUser()!;

  const res = await baseFetch(`/users?id_ne=${id}&_delay=2000`)

  return await res.json();
}
