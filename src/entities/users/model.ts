import { combine, createEffect, createStore } from 'effector';
import { User, getUsers } from 'shared/api';

const fetchUsersFx = createEffect(async () => await getUsers());
const $users = createStore([] as User[]);
const $loading = fetchUsersFx.pending;

$users.on(fetchUsersFx.done, (_, { result }) => result);

const $usersState = combine($users, $loading, (users, loading) => ({ users, loading }));

export const usersModel = { $usersState, fetchUsersFx, $loading };
