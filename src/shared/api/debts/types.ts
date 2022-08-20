import { User } from '../users/types';

export interface DebtBody {
  description: string;
  debts: {
    userId: number;
    amount: number;
  }[];
}

export type Transaction = {
  userId: number;
  description: string;
  type: string;
  createdAt: any;
  id: number;
}

export type Debt = {
  userId: number;
  amount: number;
  transactionId: number;
  lenderId: number;
  id: number;
  transaction: Transaction;
  user: User;
}

