import { Button, Table } from '../../shared/ui';
import { debtsModel, DebtsRow } from '../../entities';
import { useStore } from 'effector-react';
import { forgiveModel } from '../../feutures';

const DebtsList = () => {
  const { debts, loading, error } = useStore(debtsModel.$debtState);

  if (error) {
    return <div>{error}</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!debts.length) {
    return <div>Нет долгов</div>
  }

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
          {
            debts.map((debt) =>
              <DebtsRow
                key={debt.userId}
                debt={debt}
                action={debt.type === 'loan' && <Button
                  variant="text"
                  size="small"
                  onClick={() => forgiveModel.openModal({ userId: debt.userId, amount: debt.amount })}
                >Простить долг</Button>}
              />
            )
          }
        </Table.Body>
      </Table.Root>
    </>

  )
}


export { DebtsList }
