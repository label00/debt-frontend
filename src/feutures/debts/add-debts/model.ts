import { createEffect, forward } from 'effector';
import { addDebts } from '../../../shared/api';
import { debtsModel } from '../../../entities';
import { FormValue } from './types';

const addDebtsFx = createEffect(async (data: FormValue) => {
  return await addDebts(data)
})

forward({
  from: addDebtsFx.done,
  to: debtsModel.fetchDebtsFx,
})

export { addDebtsFx }
