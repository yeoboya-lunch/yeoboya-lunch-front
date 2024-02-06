import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  label?: string;
  name: string;
  kind?: 'text' | 'phone' | 'price' | 'hidden' | 'checkbox';
  type: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  defaultValue?: string;
}

export default function Input({
  label,
  name,
  kind = 'text',
  register,
  type,
  required = true,
  disabled = false,
  readOnly = false,
  defaultValue,
}: InputProps) {
  return (
    <div>
      <label className="mb-1 block border-red-500 text-sm font-medium text-gray-700" htmlFor={name}>
        {label}
      </label>
      {kind === 'text' ? (
        <div className="relative flex items-center  rounded-md shadow-sm">
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            disabled={disabled}
            readOnly={readOnly}
            defaultValue={defaultValue}
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm read-only:cursor-not-allowed read-only:text-gray-500 focus:border-orange-500
            focus:outline-none focus:ring-orange-500"
          />
        </div>
      ) : null}
      {kind === 'price' ? (
        <div className="relative flex items-center  rounded-md shadow-sm">
          <div className="pointer-events-none absolute left-0 flex items-center justify-center pl-3">
            <span className="text-sm text-gray-500">￦</span>
          </div>
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            defaultValue={defaultValue}
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
          <div className="pointer-events-none absolute right-0 flex items-center pr-3">
            <span className="text-gray-500">KRW</span>
          </div>
        </div>
      ) : null}
      {kind === 'phone' ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex select-none items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            +82
          </span>
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            disabled={disabled}
            readOnly={readOnly}
            defaultValue={defaultValue}
            placeholder={'10-0000-0000'}
            className="w-full appearance-none rounded-md rounded-l-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
        </div>
      ) : null}

      {kind === 'hidden' ? (
        <input
          hidden
          id={name}
          required={required}
          {...register}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={defaultValue}
        />
      ) : null}

      {kind === 'checkbox' ? <input hidden id={name} {...register} type={'checkbox'} /> : null}
    </div>
  );
}
