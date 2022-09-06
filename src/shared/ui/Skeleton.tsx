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
};

const Rows = ({ count, ...rowProps }: RowsProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Row key={i} {...rowProps} />
      ))}
    </>
  );
};

export const Skeleton = {
  Container,
  Row,
  Rows,
};
