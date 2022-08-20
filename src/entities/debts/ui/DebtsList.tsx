import { Debt } from '../../../shared/api';
import { DebtsRow } from './DebtsRow';

type DebtsListProps = {
  debts: Debt[];
}

export const DebtsList = ({ debts }: DebtsListProps) => {
  return (
    <div>
      <ul className="mt-2">{debts.map((debt) => <DebtsRow key={debt.id} debt={debt}/>)}</ul>
    </div>
  )
}
