import { ReactNode } from 'react';
import cn from 'classnames';

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => <div className="animate-pulse">{children}</div>;

type RowProps = {
  height?: `h-${number}`;
};
const Row = ({ height = 'h-14' }: RowProps) => <div className={cn(height, 'bg-slate-200 rounded-2xl')}></div>;

type RowsProps = RowProps & {
  count: number;
  className?: string;
};

const Rows = ({ count, className, ...rowProps }: RowsProps) => {
  return (
    <div className={className}>
      {Array.from({ length: count }, (_, i) => (
        <Row key={i} {...rowProps} />
      ))}
    </div>
  );
};

export const Skeleton = {
  Container,
  Row,
  Rows,
};
