import { useField } from 'formik';
import { OptionHTMLAttributes, PropsWithChildren, SelectHTMLAttributes } from 'react';
import cn from 'classnames';

type SelectProps = PropsWithChildren<{
  name: string;
  label?: string;
}> &
  SelectHTMLAttributes<unknown>;

export const Select = ({ name, children, label, ...rest }: SelectProps) => {
  const [field, meta] = useField({ name });
  const isError = !!meta.error && meta.touched;

  return (
    <label className="block">
      {!!label && <span className="block text-sm font-medium text-slate-700">{label}</span>}
      <select
        className={cn(
          `
          mt-1 block w-full px-3 py-2 bg-white rounded-md text-sm shadow-sm border placeholder-slate-400
          focus:outline-none focus:border-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        `,
          {
            'border-pink-500 text-pink-600': isError,
            'border-slate-400': !isError,
          }
        )}
        {...field}
        {...rest}
      >
        {children}
      </select>
    </label>
  );
};

type OptionProps = { children: string } & OptionHTMLAttributes<unknown>;

export const Option = ({ children, ...rest }: OptionProps) => {
  return (
    <option className="text-black" {...rest}>
      {children}
    </option>
  );
};
