import { useField } from 'formik';
import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import cn from 'classnames';

type InputProps = { label?: string, type?: HTMLInputTypeAttribute, name: string } & InputHTMLAttributes<any>

export const Input = ({ label, type = 'text', name, ...rest }: InputProps) => {
  const [field, meta] = useField({ name });

  return (
    <label className="block">
      {!!label && <span className="block text-sm font-medium text-slate-700">{label}</span>}
      <input type={type} className={cn(
        `mt-1 block w-full px-3 py-2 bg-white rounded-md text-sm shadow-sm border border-slate-300 placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:text-inherit
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none`,
        { 'border-pink-500 text-pink-500': !!meta.error && meta.touched },
      )} {...field} {...rest}/>
    </label>
  )
}
