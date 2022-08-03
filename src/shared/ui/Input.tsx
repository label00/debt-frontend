import { FieldInputProps } from "formik";

type InputProps = FieldInputProps<any> & { label: string, type: string, error: boolean }

export const Input = ({label, ...rest}: InputProps) => {

  return (
    <label className="block">
      {!!label && <span className="block text-sm font-medium text-slate-700">{label}</span>}
      <input className="
        mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        invalid:border-pink-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      " {...rest}/>
    </label>
  )
}