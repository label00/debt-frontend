import { History, TransactionTypes } from 'shared/api';
import { EmptyCard, ErrorCard, Skeleton } from 'shared/ui';
import { historyModel } from 'entities';
import { combine } from 'effector';
import { useStore } from 'effector-react';

const state = combine(historyModel.$loading, historyModel.$list, historyModel.$error);
type RowProps = {
  history: History;
};
const TRANSACTIONS_NAMES: Record<TransactionTypes, string> = {
  repay: 'вернул',
  add: 'одолжил',
  forgive: 'простил',
};
const Row = ({ history }: RowProps) => {
  const formattedDate = new Date(history.createdAt).toLocaleDateString();

  return (
    <div
      className="
        grid grid-cols-5 gap-x-2 auto-cols-[fit-content(400px)] justify-between
        sm:bg-transparent sm:p-0
      "
    >
      <div>{history.isCurrentUser ? 'Вы' : history.creatorUserName}</div>
      <div>{TRANSACTIONS_NAMES[history.transactionType]}</div>
      <div>{history.isCurrentUser ? history.targetUserName : 'Вам'}</div>
      <div>{history.amount}уе</div>
      <div>{formattedDate}</div>
    </div>
  );
};
export const TransactionsHistoryList = () => {
  const [loading, history, error] = useStore(state);

  if (error) {
    return <ErrorCard text="Что-то пошло не так" />;
  }

  if (loading) {
    return (
      <Skeleton.Container>
        <Skeleton.Rows className="flex flex-col gap-2" count={10} height="h-8" />
      </Skeleton.Container>
    );
  }

  if (!history.length) {
    return <EmptyCard>Нет истории с данным пользывателем!</EmptyCard>;
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      {history.map((item, idx) => (
        <>
          <Row key={idx} history={item} />
          {idx !== history.length - 1 && <div className="w-full h-[1px] bg-slate-200"></div>}
        </>
      ))}
    </div>
  );
};
