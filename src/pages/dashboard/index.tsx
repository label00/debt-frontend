import { useEffect } from 'react';
import { debtsModel } from 'entities';
import { addDebtModel, AddDebtsModal } from 'feutures';
import { Button, H2 } from 'shared/ui';
import { DebtsList } from 'widgets';

export const Dashboard = () => {
  useEffect(() => {
    debtsModel.moundedDashboard();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex gap-2 mb-4 items-center">
        <H2>Список долгов</H2>
        <Button size="small" onClick={() => addDebtModel.openModal()}>
          Добавить долг
        </Button>
      </div>

      <DebtsList />

      <AddDebtsModal />
    </div>
  );
};
