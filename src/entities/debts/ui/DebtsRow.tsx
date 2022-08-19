import { Debt } from '../../../shared/api';

type DebtsRowProps = {
  debt: Debt;
}

export const DebtsRow = ({ debt }: DebtsRowProps) => {
  return (
    <li>ID: {debt.id} | Сумма: {debt.amount} | Должник: {debt.user.name}</li>
  )
}
