import { ReactNode } from 'react';

type TypographyProps = {
  children?: ReactNode;
};

export const H2 = ({ children }: TypographyProps) => <h2 className="text-xl font-bold">{children}</h2>;

export const H3 = ({ children }: TypographyProps) => <h3 className="font-medium">{children}</h3>;
