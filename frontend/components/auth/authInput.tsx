import clsx from 'clsx'
import { ChangeEvent } from 'react'
import type { RegisterKeys } from 'hooks/auth/useRegister'

interface InputProps {
  isError: boolean
  label: RegisterKeys
  type: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function AuthInput(props: InputProps) {
  const { isError, label, type, value, onChange } = props
  return (
    <div
      className={clsx(
        'w-full h-12 text-xl relative mb-8',
        'md:w-2/3 md:mx-auto'
      )}
    >
      <input
        className={clsx(
          'absolute top-0 left-0 z-10',
          'w-full h-full rounded-xl bg-transparent border-2 p-3 outline-none',
          'peer',
          'text-gray-600',
          `${isError ? 'border-red-200' : ''}`
        )}
        required
        type={type}
        value={value}
        onChange={onChange}
        maxLength={label === 'email' ? 60 : 40}
      ></input>
      <span
        className={clsx(
          'absolute top-0 left-0',
          'w-full h-full pt-[10px] pl-3 text-gray-500 pointer-events-none',
          'uppercase opacity-40',
          'peer-focus:-translate-y-8 peer-focus:-translate-x-3 peer-focus:text-sm peer-focus:opacity-100',
          'peer-valid:-translate-y-8 peer-valid:-translate-x-3 peer-valid:text-sm peer-valid:opacity-100',
          'transition-all ease-in duration-300'
        )}
      >
        {label}
      </span>
    </div>
  )
}
