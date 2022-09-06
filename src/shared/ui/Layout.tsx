import { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren) => {
  return <div className="w-full px-10 py-2 h-16 shadow">{children}</div>;
};

const Content = ({ children }: PropsWithChildren) => {
  return <div className="w-full px-4 sm:px-10 py-10 h-full">{children}</div>;
};

export const Layout = {
  Header,
  Content,
};
