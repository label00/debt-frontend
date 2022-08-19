import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, DebtsList, fetchDebts } from '../../entities';
import { selectDebt } from '../../entities/debts/model/transactions.selectors';
import { AddDebtsModal } from '../../feutures/debts';
import { Button } from '../../shared/ui';

const PageContent = ({ handleOpen }: ContentProps) => {
  const { debts, loaded, error } = useSelector(selectDebt);

  if (error) {
    return <div>{error}</div>
  }
  if (!loaded) {
    return <div>Loading...</div>
  }
  if (!debts.length) {
    return <div>Empty</div>
  }

  return <DebtsList debts={debts} action={<Button size="small" onClick={handleOpen}>Добавить долг</Button>}/>
}


export const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const promise = dispatch(fetchDebts());
    return promise.abort;
  }, [dispatch])

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  }

  return (
    <div className="container mx-auto">
      <AddDebtsModal isOpen={isOpen} onClose={handleClose}/>
      <PageContent handleOpen={handleOpen}/>
    </div>
  );
}
type ContentProps = {
  handleOpen: () => void;
}
