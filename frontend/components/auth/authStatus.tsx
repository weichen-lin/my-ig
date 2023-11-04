import clsx from 'clsx'
import { ErrorIcon, SuccessIcon } from 'public/icon/login'
import { Icon } from '@iconify/react'

interface InputSuccessProps {
  message: string
  status: Status
}

type Status = 'success' | 'failed'

interface StatusIcon {
  [key: string]: JSX.Element
}

const statusObj: StatusIcon = {
  success: <Icon icon='ic:round-check-circle-outline' className='' />,
  failed: <Icon icon='ic:baseline-error-outline' className='' />,
}

export default function AuthStatus(props: InputSuccessProps) {
  const { message, status } = props
  return (
    <div
      className={clsx(
        'py-1 flex items-center justify-start gap-x-3 px-4 rounded-md',
        'w-full max-w-[350px]',
        `${status === 'success' ? 'bg-green-100' : 'bg-red-100/80'}`,
      )}
    >
      {statusObj[status]}
      <span className='font-semibold'>{message}</span>
    </div>
  )
}
