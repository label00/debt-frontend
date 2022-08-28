import { User } from '../users';

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
  createdAt: number;
  id: number;
};

export type Debt = {
  userId: number;
  amount: number;
  transactionId: number;
  lenderId: number;
  id: number;
  transaction: Transaction;
  user: User;
};

export type UsersDebts = {
  userId: number;
  userName: string;
  amount: number;
  type: 'loan' | 'borrow';
  typeName: string;
};
