import { useEffect, useState } from 'react';
import { debtsModel } from '../../entities';
import { AddDebtsModal, ForgiveModal } from '../../feutures';
import { Button, H3 } from '../../shared/ui';
import { DebtsList } from '../../widgets';


export const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    debtsModel.moundedDashboard()
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

      <DebtsList/>

      <ForgiveModal/>
    </div>
  );
}
