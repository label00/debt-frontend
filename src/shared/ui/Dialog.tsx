import { PropsWithChildren } from 'react';
import { Portal } from './Portal';
import { H2 } from './Typography';

type DialogProps = PropsWithChildren<{
  isOpen?: boolean;
  onClose?: () => void;
}>

const Root = ({ children, isOpen }: DialogProps) => {
  if (isOpen) {
    return (
      <Portal>
        <div className="bg-gray-200 bg-opacity-60 fixed w-full h-full left-0 top-0">
          {children}
        </div>
      </Portal>
    )
  }
  return null
}

const Content = ({ children }: PropsWithChildren) => (
  <div className="bg-white rounded-xl w-96 px-8 py-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    {children}
  </div>
)

const Footer = ({ children }: PropsWithChildren) => (
  <div className="w-full flex justify-end  mt-2 space-x-2">{children}</div>
)

const Title = ({ children }: PropsWithChildren) => (
  <H2>{children}</H2>
)


export const Dialog = { Root, Content, Title, Footer }
