import React from 'react';
import cn from 'classnames';

type SizeTypes = 'small' | 'medium' /*| 'large'*/;
type VariantType = 'text' | 'contained' | 'outline';
type ColorType = 'primary' | 'secondary' /* | 'success' | 'error'*/;

export type ButtonProps =
  { size?: SizeTypes, variant?: VariantType, color?: ColorType, }
  & React.ButtonHTMLAttributes<HTMLButtonElement>

const sizes = {
  medium: 'px-4 py-1 font-semibold rounded-md',
  small: 'px-3 py-1 text-sm font-medium rounded-md',
}

const base = 'disabled:border-gray-100 disabled:text-gray-500 disabled:opacity-70 disabled:bg-gray-100';


const variants: Record<VariantType, Record<ColorType, string>> = {
  text: {
    primary: `
      text-blue-600
      hover:bg-blue-100
      focus:border-blue-100 focus:bg-blue-100
    `,
    secondary: `
      text-purple-600
      hover:text-purple-700 hover:bg-purple-100
      focus:text-purple-700 focus:bg-purple-100
    `
  },
  outline: {
    primary: `
      border border-blue-600 text-blue-600
      hover:border-blue-700 hover:text-blue-700
      focus:border-blue-700 focus:text-blue-700
    `,
    secondary: `
      border border-purple-600 text-purple-600
      hover:text-purple-700 hover:border-purple-400
      focus:text-purple-700 focus:border-purple-400
    `,
  },
  contained: {
    primary: `
      bg-blue-600 text-white border border-blue-600
      hover:bg-blue-700 hover:border-blue-700
      focus:border-blue-700
    `,
    secondary: `
      border bg-purple-600 text-white
      hover:text-purple-700 hover:bg-purple-400
      focus:text-purple-700 focus:bg-purple-400
    `,
  }
}


export const Button = (
  {
    children,
    type = 'button',
    size = 'medium',
    variant = 'outline',
    color = 'primary',
    className,
    ...rest
  }: ButtonProps) => (
  <button
    type={type}
    className={cn(base, sizes[size], variants[variant][color], className)}
    {...rest}
  >
    {children}
  </button>
)
