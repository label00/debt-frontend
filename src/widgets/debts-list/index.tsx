import { useStore } from 'effector-react';
import { Button, ErrorCard, Skeleton } from 'shared/ui';
import { DebtsCard, debtsModel } from 'entities';
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
        <div className="grid sm:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-4">
          <Skeleton.Rows count={3} height="h-14" />
        </div>
      </Skeleton.Container>
    );
  }

  if (!debts.length) {
    return (
      <div className="border border-dashed border-gray-400 px-4 py-2 rounded-md flex flex-col items-center">
        <BanknotesIcon className="h-16 w-16 stroke-gray-400" />
        <span className="font-medium text-gray-400">Вы и вам ничего не должны</span>
      </div>
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
