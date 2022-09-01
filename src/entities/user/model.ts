import { createEffect, createEvent, createStore } from 'effector';
import { auth, clearUser, saveUser } from 'shared/api';

type UserData = {
  email: string;
  password: string;
};

type UserState = {
  id: string | null;
  name: string | null;
  email: string | null;
};

const defaultState: UserState = { name: null, email: null, id: null };

const loginUserFx = createEffect(async ({ email, password }: UserData) => await auth(email, password));
const logout = createEvent();
const $user = createStore(defaultState);

$user.on(loginUserFx.done, (state, { result }) => result).on(logout, () => defaultState);

loginUserFx.done.watch(({ result }) => saveUser(result.access_token));
logout.watch(() => clearUser());

export const userModel = { $user, loginUserFx, logout };
