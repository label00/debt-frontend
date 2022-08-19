import { Debt, DebtBody } from './types';
import { baseFetch, getCurrentUser } from '../../lib';

export const getDebts = async (): Promise<Debt[]> => {
  const currentUser = getCurrentUser();
  const res = await baseFetch(`/debts?lenderId=${currentUser.id}`)
  return await res.json();
}

export const addDebts = async (debt: DebtBody): Promise<Debt> => {
  const currentUser = getCurrentUser();
  const body = {
    userId: currentUser.id,
    type: 'add',
    ...debt,
  }

  const res = await baseFetch('/transactions', 'POST', body)

  return await res.json();

}
