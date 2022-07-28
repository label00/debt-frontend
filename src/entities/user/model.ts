import { createEffect, restore } from 'effector';
import { getUserById } from '../../shared/api';
import { reset } from 'patronum';

export const createUserModel = () => {
  const fetchUserFx = createEffect(async (id: string) => getUserById(id));
  const $user = restore(fetchUserFx, null);
  const $loading = fetchUserFx.pending;
  const $loaded = $user.map((user) => !!user);
  const $error = restore(fetchUserFx.fail, null);

  reset({ clock: fetchUserFx.pending, target: $error });

  return { fetchUserFx, $user, $loading, $error, $loaded };
};
