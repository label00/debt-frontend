import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const EmptyCard = ({ children }: Props) => {
  return (
    <div className="border border-dashed border-gray-400 px-4 py-2 rounded-md flex flex-col items-center">
      {children}
    </div>
  );
};
