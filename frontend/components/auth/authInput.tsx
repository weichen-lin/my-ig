import clsx from 'clsx'
import { ChangeEvent } from 'react'
import type { RegisterKeys } from 'hooks/auth'

interface InputProps<T> {
  label: string
  type: string
  value: string
  validate?: (e: T) => boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  Error?: (value?: { value: string }) => JSX.Element
}

export default function AuthInput(props: InputProps<string>) {
  const { label, type, value, validate, onChange, Error } = props

  const changeFocus = () => {
    if (!validate || value === '') return false
    return !validate(value)
  }

  const isError = changeFocus()

  return (
    <div>
      <div className={clsx('w-full h-12 text-xl relative mb-1')}>
        <input
          className={clsx(
            'absolute top-0 left-0 text-gray-600',
            'w-full h-full rounded-xl bg-transparent border-2 p-3 outline-none',
            'peer',
            `${isError ? 'border-red-200' : ''}`,
            `${
              validate && !isError && value !== '' ? 'border-green-500/50' : ''
            }`
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
      {isError && validate && Error ? <Error value={value} /> : <></>}
    </div>
  )
}
