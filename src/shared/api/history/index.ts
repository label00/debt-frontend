import { baseFetch } from '../../lib';

type TransactionTypes = 'repay' | 'add' | 'forgive';

type History = {
  userName: string;
  transactionType: TransactionTypes;
  amount: number;
  createdAt: string;
  isPositive: boolean;
};

type Pagination = {
  count: number;
  limit: number;
  page: number;
};

type HistoryResponse = {
  result: History[];
  pagination: Pagination;
};

type PaginationQuery = {
  limit?: number;
  page?: number;
};

const getHistory = (userId: string, pagination: PaginationQuery = {}): Promise<HistoryResponse> => {
  const params = Object.entries(pagination)
    .filter(([_, param]) => param !== undefined)
    .map(([key, param]) => `${key}=${param}`)
    .join('&');

  return baseFetch(`/transactions/${userId}${params ? '?' + params : ''}`).then((data) => data.json());
};

export { getHistory };
export type { PaginationQuery, HistoryResponse, History, TransactionTypes };
