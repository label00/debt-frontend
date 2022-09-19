import { EmptyCard, ErrorCard, Skeleton } from 'shared/ui';
import { historyModel, Row } from 'entities';
import { combine } from 'effector';
import { useStore } from 'effector-react';

const state = combine(historyModel.$loading, historyModel.$list, historyModel.$error);
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
        <Row key={idx} history={item} />
      ))}
    </div>
  );
};
