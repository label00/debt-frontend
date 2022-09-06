import { ReactNode } from 'react';
import { UsersDebts } from 'shared/api';
import { Avatar, Chip, BadgeColorsType } from 'shared/ui';

type DebtsCardProps = {
  debt: UsersDebts;
  action?: ReactNode;
};

const BADGES_TEXT = {
  loan: 'Должен',
  borrow: 'Одолжил',
};

const BADGES_COLORS: Record<string, BadgeColorsType> = {
  loan: 'red',
  borrow: 'green',
};

export const DebtsCard = ({ debt, action }: DebtsCardProps) => {
  const initial = debt.userName.at(0) ?? 'N';

  return (
    <div className="flex items-center gap-2 bg-white rounded-2xl max-w-full px-4 py-2 shadow-md border border-gray-100">
      <Avatar>{initial}</Avatar>
      <div className="flex-1 flex justify-between items-center">
        <div className="flex flex-col text-start relative">
          <div className="flex items-center gap-1 text-xl">
            <span className="font-bold capitalize">{debt.userName}</span>
            <Chip color={BADGES_COLORS[debt.type]}>{BADGES_TEXT[debt.type]}</Chip>
          </div>
          <span className="font-medium 700 text-sm text-gray-500">{debt.amount}ye</span>
        </div>
        {action}
      </div>
    </div>
  );
};
