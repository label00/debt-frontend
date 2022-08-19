import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ children }: { children: ReactNode }) => {
  const container = window.document.body;
  return createPortal(children, container);
}
