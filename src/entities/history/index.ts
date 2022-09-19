import { createEffect, createEvent, restore, sample } from 'effector';
import { getHistory, HistoryResponse, PaginationQuery } from 'shared/api';
import { navigateToFx } from '../../shared/lib';
import { reset } from 'patronum';

const navigateToHistory = createEvent<string>();

type FetchFxType = { userId: string; pagination: PaginationQuery };

const loadFx = createEffect(async ({ userId, pagination }: FetchFxType) => getHistory(userId, pagination));

const initialValue: HistoryResponse = {
  result: [],
  pagination: {
    page: 1,
    count: 0,
    limit: 10,
  },
};

const $history = restore(loadFx, initialValue);
const $list = $history.map((item) => item.result);
const $loading = loadFx.pending;
const $error = restore(loadFx.fail, null);

reset({ clock: loadFx.done, target: $error });

sample({
  clock: navigateToHistory,
  fn: (id) => `/history/${id}`,
  target: navigateToFx,
});

export const historyModel = { $history, $list, $loading, $error, navigateToHistory, loadFx };
export { Row } from './HistoryRow';
