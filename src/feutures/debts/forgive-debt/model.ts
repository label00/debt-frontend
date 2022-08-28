import { createEffect, createEvent, createStore, forward, sample } from 'effector';
import { forgiveDebt } from 'shared/api';
import { debtsModel } from 'entities';

const $modal = createStore<{ userId?: number; amount?: number; isOpen: boolean }>({
  isOpen: false,
});
const openModal = createEvent<{ userId: number; amount: number }>();
const closeModal = createEvent<void>();
const submit = createEvent<number>();
const forgiveDebtFx = createEffect(async (payload: { userId: number; amount: number }) => {
  return await forgiveDebt(payload);
});

$modal
  .on(openModal, (state, payload) => ({ ...payload, isOpen: true }))
  .on(closeModal, () => ({ isOpen: false }))
  .on(forgiveDebtFx.done, () => ({ isOpen: false }));

sample({
  clock: submit,
  source: $modal,
  fn: (state, amount) => ({ userId: state.userId as number, amount: amount }),
  target: forgiveDebtFx,
});

forward({
  from: forgiveDebtFx.done,
  to: debtsModel.fetchDebtsFx,
});

const forgiveModel = {
  openModal,
  closeModal,
  submit,
  forgiveDebtFx,
  $modal,
};
export { forgiveModel };
