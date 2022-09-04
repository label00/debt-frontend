import { createEffect, createEvent, createStore, sample } from 'effector';
import { auth, clearAccessToken, saveAccessToken } from 'shared/api';
import { unauthorizedError } from 'shared/lib';

type UserData = {
  email: string;
  password: string;
};

type ViewerState = {
  id: string | null;
  name: string | null;
  email: string | null;
  status: 'idle' | 'done' | 'fail';
  isAuth: boolean;
};

const defaultState: ViewerState = {
  name: null,
  email: null,
  id: null,
  isAuth: false,
  status: 'idle',
};

const loginUserFx = createEffect(async ({ email, password }: UserData) => await auth(email, password));
const saveTokenFx = createEffect((token: string) => saveAccessToken(token));
const clearTokenFx = createEffect(() => clearAccessToken());
const logout = createEvent();
const $viewer = createStore(defaultState);

$viewer
  .on(loginUserFx.done, (state, { result }) => ({
    ...result,
    status: 'done',
    isAuth: true,
  }))
  .on([logout, unauthorizedError], () => ({ ...defaultState, status: 'done' }));

sample({
  clock: loginUserFx.done,
  fn: ({ result }) => result.accessToken,
  target: saveTokenFx,
});

sample({
  clock: logout,
  target: clearTokenFx,
});

export const viewerModel = { $viewer, loginUserFx, saveTokenFx, clearTokenFx, logout };
