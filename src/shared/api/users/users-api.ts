import { baseFetch, getCurrentUser } from '../../lib';

export const getUsers = async () => {
  const { id } = getCurrentUser();

  const res = await baseFetch(`/users?id_ne=${id}&_delay=2000`)

  return await res.json();
}
