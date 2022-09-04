import { User } from '../users';

export type DebtBody = {
  description: string;
  debts: {
    userId: string;
    amount: number;
  }[];
};

export type Transaction = {
  userId: string;
  description: string;
  type: string;
  createdAt: number;
  id: number;
};

export type Debt = {
  userId: string;
  amount: number;
  transactionId: number;
  lenderId: number;
  id: number;
  transaction: Transaction;
  user: User;
};

export type UsersDebts = {
  userId: string;
  userName: string;
  amount: number;
  type: 'loan' | 'borrow';
  typeName: string;
};
