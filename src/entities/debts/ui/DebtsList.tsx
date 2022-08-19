import { Debt } from '../../../shared/api';
import { DebtsRow } from './DebtsRow';
import { ReactElement } from 'react';

type DebtsListProps = {
  debts: Debt[];
  action: ReactElement;
}

export const DebtsList = ({ debts, action }: DebtsListProps) => {
  return (
    <div>
      <h4 className="font-medium mb-2">Список долгов</h4>
      {action}
      <ul className="mt-2">{debts.map((debt) => <DebtsRow key={debt.id} debt={debt}/>)}</ul>
    </div>
  )
}
