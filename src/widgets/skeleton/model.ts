import { viewerModel } from 'entities';
import { combine } from 'effector';

const $isLoaded = viewerModel.$viewer.map((state) => state.status === 'done');
const $isFail = viewerModel.$viewer.map((state) => state.status === 'fail');

export const loadProfileModel = {
  $state: combine([$isLoaded, $isFail]),
};
