import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { getUsers } from '../../shared/api/users/users-api';
import { User } from '../../shared/api';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';

const fetchUsersFx = createEffect(async () => await getUsers());
const $users = createStore([] as User[]);
const $loaded = createStore(false);
const $loading = fetchUsersFx.pending;
const mounded = createEvent();

const filter$ = combine($loaded.map(is => !is), $loading.map(is => !is))
  .map(data => data.reduce((acc, value) => acc && value, true))

sample({
  clock: mounded,
  filter: filter$,
  target: fetchUsersFx,
})

$users.on(fetchUsersFx.done, (_, { result }) => result)
$loaded.on(fetchUsersFx.done, () => true);

const $usersState = combine($users, $loading, (users, loading) => ({ users, loading }));
const useCachedUsersState = () => {
  const [state, moundedFn] = useUnit([$usersState, mounded])

  useEffect(() => {
    moundedFn()
  }, [moundedFn]);

  return state;
}

export { $usersState, useCachedUsersState }
