import { InformationCircleIcon } from '@heroicons/react/24/outline';

type ErrorCardProps = {
  text?: string;
};

export const ErrorCard = ({ text = 'Что-то пошло не так' }: ErrorCardProps) => (
  <div className="w-full border border-red-400 border-dashed px-4 py-2 rounded flex flex-col items-center">
    <InformationCircleIcon className="h-24 w-24 stroke-red-500" />
    {text && <span className="text-red-500 font-bold">{text}</span>}
  </div>
);
