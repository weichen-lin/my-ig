import { useCallback } from 'react'
import clsx from 'clsx'
import { PwdValidate } from 'hooks/auth'
import { Icon } from '@iconify/react'

export const PasswordChecker = (props?: { value: string }) => {
  const value = props?.value ?? ''

  const valueValidator = useCallback(PwdValidate, [])

  const results = valueValidator(value ?? '')

  const [lengthChecker, upperCaseChecker, numberChecker, symbolChecker] = results

  const rules = [
    {
      status: lengthChecker,
      rule: '至少 8個字元',
    },
    {
      status: upperCaseChecker,
      rule: '至少一個大寫字母',
    },
    {
      status: numberChecker,
      rule: '至少一個數字',
    },
    {
      status: symbolChecker,
      rule: '至少一個特殊符號',
    },
  ]

  return (
    <ul
      className={clsx(
        'p-2 rounded-md text-sm md:w-3/5',
        `${results.every(e => e) ? 'bg-green-300/60' : 'bg-orange-200'}`,
      )}
    >
      {rules.map(e => (
        <RuleChecker status={e.status} rule={e.rule} key={e.rule} />
      ))}
    </ul>
  )
}

const RuleChecker = (props: { status: boolean; rule: string }) => {
  const { status, rule } = props
  return (
    <li className='flex h-6 items-center gap-2'>
      {status ? (
        <Icon icon='ic:baseline-check' className='text-[#18a550]' />
      ) : (
        <Icon icon='ic:baseline-close' className='text-[#dc4c64]' />
      )}
      <span className={`${status ? 'text-green-700' : 'text-amber-700'}`}>{rule}</span>
    </li>
  )
}

export const EmailChecker = () => {
  return <p className='w-full md:mx-auto rounded-lg py-1 text-red-300'>Email格式錯誤</p>
}
