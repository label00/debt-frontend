import { Button, Pagination } from 'shared/ui';
import { TransactionsHistoryList, HistoryUserCard, historyListModel } from 'widgets/history';
import { useStore } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGate } from 'effector-react';

export const History = () => {
  const currentPage = useStore(historyListModel.$currentPage);
  const total = useStore(historyListModel.$total);
  const { id } = useParams();
  const navigate = useNavigate();
  useGate(historyListModel.historyPageGate, id);

  return (
    <div className="flex flex-col gap-y-2">
      <div>
        <Button variant="text" size="small" onClick={() => navigate('..')}>
          Назад
        </Button>
      </div>

      <HistoryUserCard />

      <div className="mb-4">
        <Pagination total={total} onChange={historyListModel.gotToPageFx} page={currentPage} />
      </div>
      <TransactionsHistoryList />
    </div>
  );
};
