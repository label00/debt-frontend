import { ReactNode } from 'react';

type TableProps = {
  children?: ReactNode;
}

const Root = ({ children }: TableProps) => {
  return <table>{children}</table>
}

const Head = ({ children }: TableProps) => {
  return <thead>{children}</thead>;
}

const Row = ({ children }: TableProps) => {
  return <tr>{children}</tr>
}

const Cell = ({ children }: TableProps) => {
  return <th>{children}</th>
}

const Body = ({ children }: TableProps) => {
  return <tbody>{children}</tbody>
}

export const Table = {
  Root,
  Head,
  Row,
  Cell,
  Body,
}
