import { Debt, DebtBody, UsersDebts } from './types';
import { baseFetch } from '../../lib';

export const getCurrentUserDebts = async (): Promise<UsersDebts[]> => {
  const res = await baseFetch(`/debts/show`);
  return res.json();
};

export const addDebts = async (body: DebtBody): Promise<Debt> => {
  const res = await baseFetch('/debts/add', 'POST', body);
  return res.json();
};

type ForgiveDebtBody = {
  userId: string;
  amount: number;
};

export const forgiveDebt = async (body: ForgiveDebtBody): Promise<Debt> => {
  const res = await baseFetch('/debts/forgive', 'POST', body);
  return res.json();
};

export type RepayDebtBody = {
  userId: string;
  amount: number;
};

export const repayDebt = async (body: RepayDebtBody): Promise<Debt> => {
  const res = await baseFetch('/debts/repay', 'POST', body);
  return res.json();
};
