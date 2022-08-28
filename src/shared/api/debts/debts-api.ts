import { Debt, DebtBody, UsersDebts } from './types';
import { baseFetch } from '../../lib';
import { getCurrentUser } from '../auth';

export const getCurrentUserDebts = async (): Promise<UsersDebts[]> => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw Error('Пользыватель не авторизован');
  }
  const res = await baseFetch(`/info/${currentUser.id}`);
  return await res.json();
};

export const addDebts = async (data: DebtBody): Promise<Debt> => {
  const currentUser = getCurrentUser();
  const body = {
    ...data,
    userId: currentUser.id,
    type: 'add',
  };

  const res = await baseFetch('/transactions', 'POST', body);

  return await res.json();
};

type ForgiveDebtBody = {
  userId: number;
  amount: number;
};

export const forgiveDebt = async (data: ForgiveDebtBody): Promise<Debt> => {
  const currentUser = getCurrentUser();
  const body = {
    userId: currentUser.id,
    debts: [data],
    type: 'forgive',
  };

  const res = await baseFetch('/transactions', 'POST', body);
  return await res.json();
};
