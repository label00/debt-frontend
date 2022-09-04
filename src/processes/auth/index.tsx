import { viewerModel } from 'entities';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { and, condition, not } from 'patronum';
import { getProfile, getSavedToken } from 'shared/api';
import { createNavigateFx, unauthorizedError } from 'shared/lib';

const $isAuth = viewerModel.$viewer.map((state) => state.isAuth);
const $hasAccessToken = createStore(!!getSavedToken());

const initRouting = createEvent();
const initProfile = createEvent();
const loadProfileFx = createEffect(async () => getProfile());

const navigateToLoginPageFx = createNavigateFx('/login');

viewerModel.$viewer
  .on(loadProfileFx.done, (state, { result }) => ({
    ...result,
    status: 'done',
    isAuth: true,
    hasError: false,
  }))
  .on(loadProfileFx.fail, (state) => ({ ...state, loaded: true, hasError: true }));

sample({
  clock: [unauthorizedError, viewerModel.logout],
  target: navigateToLoginPageFx,
});

condition({
  source: initRouting,
  if: $hasAccessToken,
  then: initProfile,
  else: navigateToLoginPageFx,
});

sample({
  clock: initProfile,
  filter: and(not(loadProfileFx.pending), not($isAuth), $hasAccessToken),
  target: loadProfileFx,
});

sample({
  clock: unauthorizedError,
  target: viewerModel.clearTokenFx,
});

export { initRouting };
