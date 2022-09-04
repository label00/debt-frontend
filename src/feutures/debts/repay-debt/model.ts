import { sample, createEffect, createEvent, createStore, forward } from 'effector';
import { repayDebt, RepayDebtBody } from 'shared/api';
import { debtsModel } from 'entities';

type StateType = { userId?: string; amount?: number; isOpen: boolean };

const $modal = createStore<StateType>({ isOpen: false });
const openModal = createEvent<{ userId: string; amount: number }>();
const closeModal = createEvent<void>();
const submit = createEvent<number>();
const forgiveDebtFx = createEffect(async (payload: RepayDebtBody) => repayDebt(payload));

$modal
  .on(openModal, (state, payload) => ({ ...payload, isOpen: true }))
  .on(closeModal, () => ({ isOpen: false }))
  .on(forgiveDebtFx.done, () => ({ isOpen: false }));

sample({
  clock: submit,
  source: $modal,
  fn: (state, amount) => ({ userId: state.userId!, amount }),
  target: forgiveDebtFx,
});

forward({
  from: forgiveDebtFx.done,
  to: debtsModel.fetchDebtsFx,
});

export const repayModalModel = {
  $modal,
  openModal,
  closeModal,
  submit,
};
