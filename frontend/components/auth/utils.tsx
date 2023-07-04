import { useCallback } from 'react'
import clsx from 'clsx'
import { TickIcon, CancelIcon } from 'public/icon/login'
import { PwdValidate } from 'hooks/auth'

export const PasswordChecker = (props?: { value: string }) => {
  const value = props?.value ?? ''

  const valueValidator = useCallback(PwdValidate, [])

  const results = valueValidator(value ?? '')

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
        'p-2 rounded-md text-sm mb-12 md:w-2/3 md:mx-auto mt-4',
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

export const EmailChecker = () => {
  return (
    <p className='w-full md:mx-auto rounded-lg py-1 text-red-300'>
      Email格式錯誤
    </p>
  )
}
