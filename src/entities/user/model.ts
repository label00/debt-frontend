import { createEffect, createEvent, createStore } from 'effector';
import { auth, clearUser, getSavedUser, saveUser } from '../../shared/api';

type UserData = {
  email: string;
  password: string;
}

type UserState = {
  id: number | null;
  name: string | null;
  email: string | null;
}

const defaultState: UserState = { name: null, email: null, id: null };
const savedUser = getSavedUser();
const initialState = savedUser ?? defaultState;


const loginUserFx = createEffect(async ({ email, password }: UserData) => await auth(email, password));
const logout = createEvent();
const $user = createStore(initialState);

$user
  .on(loginUserFx.done, (state, { result }) => result.user)
  .on(logout, () => defaultState)

loginUserFx.done.watch(({ result }) => saveUser(result.user));
logout.watch(() => clearUser());


export const userModel = { $user, loginUserFx, logout };
