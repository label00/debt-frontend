import React from "react";

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>


export const Button = ({children, ...rest}: ButtonProps) => {
  return <button
    className="
        px-4 py-2 rounded-full border border-blue-600 text-blue-600 font-bold
        hover:border-blue-700 hover:text-blue-700
        focus:border-blue-700 focus:text-blue-700
        disabled:border-gray-500 disabled:text-gray-500 disabled:bg-gray-100 disabled:opacity-70
      "
    {...rest}>{children}</button>
}