import clsx from 'clsx'
import { ChangeEvent } from 'react'
import type { RegisterKeys } from 'hooks/auth/useRegister'
import { TickIcon, CancelIcon } from 'public/icon/login'
import { useCallback, useState } from 'react'

interface InputProps {
  isError: boolean
  label: RegisterKeys
  type: string
  value: string
  passwordChecker?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

interface PasswordCheckerProps {
  value: string
  handleInputState: (e: boolean) => void
}

export default function AuthInput(props: InputProps) {
  const { isError, label, type, value, passwordChecker, onChange } = props
  const [inputState, setInputState] = useState<null | boolean>(null)
  const [isFoucs, setIsFocus] = useState<null | boolean>(null)

  const handleInputState = (e: boolean) => {
    setInputState(e)
  }

  return (
    <>
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
            `${isError ? 'border-red-200' : ''}`,
            `${
              passwordChecker && !inputState && typeof inputState === 'boolean'
                ? 'border-red-200'
                : ''
            }`,
            `${passwordChecker && inputState ? 'border-green-500/50' : ''}`
          )}
          required
          type={type}
          value={value}
          onChange={onChange}
          maxLength={label === 'email' ? 60 : 40}
          onFocus={() => {
            if (!passwordChecker) return
            setIsFocus(true)
          }}
          onBlur={() => {
            if (!passwordChecker) return
            setIsFocus(false)
          }}
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
      {isFoucs && passwordChecker && (
        <PasswordChecker value={value} handleInputState={handleInputState} />
      )}
    </>
  )
}

type ValidateFunc = [boolean, boolean, boolean, boolean]

const PasswordChecker = (props: PasswordCheckerProps) => {
  const { value, handleInputState } = props

  const valueValidator = useCallback((value: string): ValidateFunc => {
    const upperCaseRegex = /[A-Z]/g
    const numberRegex = /[0-9]/g
    const symbolRegex = /[!@#$%^&*]/g

    const results: ValidateFunc = [
      value.length >= 8,
      upperCaseRegex.test(value),
      numberRegex.test(value),
      symbolRegex.test(value),
    ]

    handleInputState(results.every((e) => e))

    return results
  }, [])

  const results = valueValidator(value)

  const [lengthChecker, upperCaseChecker, numberChecker, symbolChecker] =
    results

  const rules = [
    {
      status: lengthChecker,
      rule: 'At least 8 chars',
    },
    {
      status: upperCaseChecker,
      rule: 'At least 1 big letter',
    },
    {
      status: numberChecker,
      rule: 'At least 1 number',
    },
    {
      status: symbolChecker,
      rule: 'At least 1 special char',
    },
  ]

  return (
    <ul
      className={clsx(
        'p-2 rounded-md text-sm mb-12 md:w-2/3 md:mx-auto',
        `${results.every((e) => e) ? 'bg-green-300/60' : 'bg-orange-200'}`
      )}
    >
      {rules.map((e) => (
        <RuleChecker status={e.status} rule={e.rule} />
      ))}
    </ul>
  )
}

const RuleChecker = (props: { status: boolean; rule: string }) => {
  const { status, rule } = props
  return (
    <li className='flex h-6 items-center'>
      {status ? (
        <TickIcon className='w-[14px] h-[14px] mx-[9px]' fill='#18a550' />
      ) : (
        <CancelIcon className='w-6 h-6 m-1' fill='#dc4c64' />
      )}
      <span
        className={clsx(
          'p-[6px]',
          `${status ? 'text-green-700' : 'text-amber-700'}`
        )}
      >
        {rule}
      </span>
    </li>
  )
}
