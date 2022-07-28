import { UserCard } from 'entities/user';
import { ErrorCard } from 'shared/ui';
import { useUserModel } from './model';
import { useParams } from 'react-router-dom';

export const HistoryUserCard = () => {
  const { id } = useParams();
  const { user, loaded, error } = useUserModel(id!);

  if (error) {
    return <ErrorCard />;
  }

  if (!loaded) {
    return <>Loading...</>;
  }

  return (
    <div className="border border-slate-200 rounded-2xl p-2 ">
      <UserCard user={user!} />
    </div>
  );
};
