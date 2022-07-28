import { useStore } from 'effector-react';
import { Button, EmptyCard, ErrorCard, Skeleton } from 'shared/ui';
import { DebtsCard, debtsModel, historyModel } from 'entities';
import { ForgiveModal, forgiveModel, RepayDebtModel, repayModalModel } from 'feutures';
import { BanknotesIcon } from '@heroicons/react/24/outline';

const BUTTONS_TITLE = {
  loan: 'Простить',
  borrow: 'Вернуть',
};

const DebtsList = () => {
  const { debts, loading, error } = useStore(debtsModel.$debtState);

  if (error) {
    return <ErrorCard text="Что-то пошло не так"></ErrorCard>;
  }

  if (loading) {
    return (
      <Skeleton.Container>
        <Skeleton.Rows
          className="grid sm:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-4"
          count={3}
          height="h-14"
        />
      </Skeleton.Container>
    );
  }

  if (!debts.length) {
    return (
      <EmptyCard>
        <BanknotesIcon className="h-16 w-16 stroke-gray-400" />
        <span className="font-medium text-gray-400">Вы и вам ничего не должны</span>
      </EmptyCard>
    );
  }

  const handleClick = (userId: string, amount: number, type: 'loan' | 'borrow') => {
    if (type === 'loan') {
      forgiveModel.openModal({ userId, amount });
    }
    if (type === 'borrow') {
      repayModalModel.openModal({ userId, amount });
    }
  };

  return (
    <>
      <div className="grid sm:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-4">
        {debts.map((debt) => (
          <DebtsCard
            key={debt.userId}
            debt={debt}
            onClick={() => historyModel.navigateToHistory(debt.userId)}
            action={
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => handleClick(debt.userId, debt.amount, debt.type)}
              >
                {BUTTONS_TITLE[debt.type]}
              </Button>
            }
          />
        ))}
      </div>

      <RepayDebtModel />
      <ForgiveModal />
    </>
  );
};

export { DebtsList };
