import { UsersDebts } from '../../../shared/api';
import { Table } from '../../../shared/ui';
import { ReactNode } from 'react';

type DebtsRowProps = {
  debt: UsersDebts;
  action?: ReactNode;
};

export const DebtsRow = ({ debt, action }: DebtsRowProps) => {
  return (
    <Table.Row>
      <Table.Cell>{debt.userId}</Table.Cell>
      <Table.Cell>{debt.typeName}</Table.Cell>
      <Table.Cell>{debt.userName}</Table.Cell>
      <Table.Cell>{debt.amount}</Table.Cell>
      <Table.Cell>{action}</Table.Cell>
    </Table.Row>
  );
};
