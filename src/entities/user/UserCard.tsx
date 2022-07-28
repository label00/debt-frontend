import { User } from 'shared/api';
import { Avatar } from '../../shared/ui';

type UserCardProps = {
  user: User;
};

export const UserCard = ({ user }: UserCardProps) => {
  const initial = user.name.at(0) ?? 'N';
  return (
    <div className="flex items-center gap-x-2">
      <Avatar>{initial}</Avatar>
      <span className="font-medium">
        Пользыватель: <span className="text-slate-500">{user.name}</span>
      </span>
    </div>
  );
};
