import { combine, createEffect, createEvent, createStore, restore, sample } from 'effector';
import { getCurrentUserDebts, UsersDebts } from '../../shared/api';

const fetchDebtsFx = createEffect(async () => {
  return await getCurrentUserDebts();
});

const $debts = createStore<UsersDebts[]>([]);
const $debtsLoading = fetchDebtsFx.pending;
const $error = restore(fetchDebtsFx.failData, null).map((error) => error?.message);
const moundedDashboard = createEvent();
const createNewDebt = createEvent();

$debts.on(fetchDebtsFx.done, (_, { result }) => result);

sample({
  clock: moundedDashboard,
  filter: $debtsLoading.map((is) => !is),
  target: fetchDebtsFx,
});

const $debtState = combine($debts, $debtsLoading, $error, (debts, loading, error) => ({
  debts,
  loading,
  error,
}));

export const debtsModel = { fetchDebtsFx, $debtState, moundedDashboard, createNewDebt };
