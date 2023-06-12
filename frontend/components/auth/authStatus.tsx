import clsx from 'clsx'
import { ErrorIcon, SuccessIcon, IconProps } from 'public/icon/login'

interface InputSuccessProps {
  message: string
  status: Status
}

type Status = 'success' | 'failed'

interface StatusIcon {
  [key: string]: JSX.Element
}

const statusObj: StatusIcon = {
  success: (
    <SuccessIcon className='h-4 w-4 my-[4px] xs:h-8 xs:w-8 xs:m-[10px]' />
  ),
  failed: (
    <ErrorIcon className='h-[20px] w-[20px] my-[8px] mx-[6px] xs:h-8 xs:w-8 xs:m-[10px]' />
  ),
}

export default function AuthStatus(props: InputSuccessProps) {
  const { message, status } = props
  return (
    <div
      className={clsx(
        'h-8 text-xl relative mb-8 flex',
        'md:mx-auto rounded-lg',
        'w-full md:w-2/3 xs:h-12',
        `${status === 'success' ? 'bg-green-100' : 'bg-red-100'}`
      )}
    >
      {statusObj[status]}
      <span className='ml-[6px] my-[6px] xs:m-[12px] xl:my-[10px] text-sm xs:text-lg font-bold md:text-lg'>
        {message}
      </span>
    </div>
  )
}