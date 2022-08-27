import { createEffect, createEvent, createStore, forward } from 'effector';
import { addDebts } from '../../../shared/api';
import { debtsModel } from '../../../entities';
import { FormValue } from './types';

const $isOpen = createStore(false);
const openModal = createEvent();
const closeModal = createEvent();
const addDebtsFx = createEffect(async (data: FormValue) => await addDebts(data));

$isOpen
  .on(openModal, () => true)
  .on(closeModal, () => false)

forward({
  from: addDebtsFx.done,
  to: [closeModal, debtsModel.fetchDebtsFx],
})

export const addDebtModel = {
  $isOpen,
  openModal,
  closeModal,
  addDebtsFx,
}
