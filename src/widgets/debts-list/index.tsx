import { Button, Table } from 'shared/ui';
import { debtsModel, DebtsRow } from 'entities';
import { useStore } from 'effector-react';
import { ForgiveModal, forgiveModel, RepayDebtModel, repayModalModel } from 'feutures';

const BUTTONS_TITLE = {
  loan: 'Простить',
  borrow: 'Вернуть',
};

const DebtsList = () => {
  const { debts, loading, error } = useStore(debtsModel.$debtState);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!debts.length) {
    return <div>Нет долгов</div>;
  }

  const handleClick = (userId: number, amount: number, type: 'loan' | 'borrow') => {
    if (type === 'loan') {
      forgiveModel.openModal({ userId, amount });
    }
    if (type === 'borrow') {
      repayModalModel.openModal({ userId, amount });
    }
  };

  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Cell>ID</Table.Cell>
            <Table.Cell>Тип</Table.Cell>
            <Table.Cell>Пользыватель</Table.Cell>
            <Table.Cell>Сумма</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {debts.map((debt) => (
            <DebtsRow
              key={debt.userId}
              debt={debt}
              action={
                <Button variant="text" size="small" onClick={() => handleClick(debt.userId, debt.amount, debt.type)}>
                  {BUTTONS_TITLE[debt.type]}
                </Button>
              }
            />
          ))}
        </Table.Body>
      </Table.Root>

      <RepayDebtModel />
      <ForgiveModal />
    </>
  );
};

export { DebtsList };
