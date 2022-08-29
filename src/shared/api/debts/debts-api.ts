import { Debt, DebtBody, UsersDebts } from './types';
import { getCurrentUser } from '../auth';
import { baseFetch } from '../../lib';

export const getCurrentUserDebts = async (): Promise<UsersDebts[]> => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw Error('Пользыватель не авторизован');
  }
  const res = await baseFetch(`/info/${currentUser.id}`);
  return res.json();
};

export const addDebts = async (data: DebtBody): Promise<Debt> => {
  const currentUser = getCurrentUser();
  const body = {
    ...data,
    userId: currentUser.id,
    type: 'add',
  };

  const res = await baseFetch('/transactions', 'POST', body);

  return res.json();
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
  return res.json();
};

export type RepayDebtBody = {
  userId: number;
  amount: number;
};

export const repayDebt = async (data: RepayDebtBody): Promise<Debt> => {
  const currentUser = getCurrentUser();
  const body = {
    userId: currentUser.id,
    debts: [data],
    type: 'repay',
  };

  const res = await baseFetch('/transactions', 'POST', body);
  return res.json();
};
