import { History, TransactionTypes } from 'shared/api';
import { ArrowUturnLeftIcon, BanknotesIcon, GiftTopIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Chip } from '../../shared/ui';
import { JSXElementConstructor } from 'react';

type RowProps = {
  history: History;
};

const TRANSACTIONS_NAMES: Record<TransactionTypes, string> = {
  repay: 'вернул',
  add: 'одолжил',
  forgive: 'простил',
};

const ICONS: Record<TransactionTypes, JSXElementConstructor<any>> = {
  repay: ArrowUturnLeftIcon,
  add: BanknotesIcon,
  forgive: GiftTopIcon,
};

export const Row = ({ history }: RowProps) => {
  const formattedDate = new Date(history.createdAt).toLocaleDateString();
  const Icon = ICONS[history.transactionType];

  return (
    <div
      className="
        grid grid-cols-4 auto-cols-auto gap-x-2 justify-between sm:bg-transparent sm:p-0 items-center
      "
    >
      <div className="flex gap-3 items-center">
        <Icon className="w-6 stroke-yellow-700" />
        <span className="font-bold text-xl">{history.userName}</span>
      </div>

      <div className="text-sm text-slate-400">{formattedDate}</div>

      <div className="font-medium">
        {history.isPositive ? '' : '-'}
        {history.amount}уе
      </div>
      <div className="justify-self-end">
        <Chip color={history.isPositive ? 'green' : 'red'}>{TRANSACTIONS_NAMES[history.transactionType]}</Chip>
      </div>
    </div>
  );
};
