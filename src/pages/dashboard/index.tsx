import { useEffect } from 'react';
import { debtsModel } from 'entities';
import { addDebtModel, AddDebtsModal, ForgiveModal } from 'feutures';
import { Button, H3 } from 'shared/ui';
import { DebtsList } from 'widgets';

export const Dashboard = () => {
  useEffect(() => {
    debtsModel.moundedDashboard();
  }, []);

  return (
    <div className="container mx-auto">
      <AddDebtsModal />
      <div>
        <H3>Список долгов</H3>
        <Button size="small" onClick={() => addDebtModel.openModal()}>
          Добавить долг
        </Button>
      </div>

      <DebtsList />

      <ForgiveModal />
    </div>
  );
};
