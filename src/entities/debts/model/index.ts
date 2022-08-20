import { combine, createEffect, createEvent, createStore, merge, restore, sample } from 'effector';
import { Debt, getDebts } from '../../../shared/api';

const fetchDebtsFx = createEffect(async () => {
  return await getDebts();
})

const $debts = createStore<Debt[]>([])
const $debtsLoading = fetchDebtsFx.pending;
const $error = restore(fetchDebtsFx.failData, null).map(error => error?.message);
const moundedDashboard = createEvent();
const createNewDebt = createEvent();

$debts.on(fetchDebtsFx.done, (_, { result }) => result)

sample({
  clock: merge([moundedDashboard, createNewDebt]),
  filter: $debtsLoading.map(is => !is),
  target: fetchDebtsFx,
})

const $debtState = combine($debts, $debtsLoading, $error, (debts, loading, error) => ({ debts, loading, error }))

export { fetchDebtsFx, $debtState, moundedDashboard, createNewDebt };
