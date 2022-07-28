import { attach, createEvent, createStore, sample } from 'effector';
import { not } from 'patronum';
import { historyModel } from 'entities';
import { createGate } from 'effector-react';

const historyPageGate = createGate<string>();
const $currentPage = createStore(1);
const $limit = createStore(10);
const $userId = historyPageGate.state;
const $total = historyModel.$history.map((historyState) => historyState.pagination.count);

const gotToPageFx = attach({
  effect: historyModel.loadFx,
  source: { userId: $userId, limit: $limit },
  mapParams: (page: number, { userId, limit }) => ({ userId, pagination: { page: page, limit: limit } }),
});

sample({
  clock: historyPageGate.open,
  filter: not(historyModel.$loading),
  source: { page: $currentPage, userId: $userId },
  fn: ({ page, userId }) => ({ userId, pagination: { page } }),
  target: historyModel.loadFx,
});

sample({
  clock: gotToPageFx,
  target: $currentPage,
});

export const historyListModel = {
  $currentPage,
  $limit,
  $userId,
  $total,
  gotToPageFx,
  historyPageGate,
};
