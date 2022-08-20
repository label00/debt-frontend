import { useEffect, useState } from 'react';
import { $debtState, DebtsList, moundedDashboard } from '../../entities';
import { AddDebtsModal } from '../../feutures/debts';
import { Button, H3 } from '../../shared/ui';
import { useStore } from 'effector-react';

const PageContent = () => {
  const { debts, loading, error } = useStore($debtState);

  if (error) {
    return <div>{error}</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!debts.length) {
    return <div>Empty</div>
  }

  return <DebtsList debts={debts}/>
}


export const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    moundedDashboard()
  }, [])

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  }

  return (
    <div className="container mx-auto">
      <AddDebtsModal isOpen={isOpen} onClose={handleClose}/>
      <div>
        <H3>Список долгов</H3>
        <Button size="small" onClick={handleOpen}>Добавить долг</Button>
      </div>

      <PageContent/>
    </div>
  );
}
