import clsx from 'clsx'
import { ErrorIcon } from 'public/icon/login'

interface InputErrorProps {
  message: string
}

export default function AuthError(props: InputErrorProps) {
  const { message } = props
  return (
    <div
      className={clsx(
        'h-8 text-xl relative mb-8 flex',
        'md:mx-auto bg-red-100 rounded-lg',
        'w-full md:w-2/3 xs:h-12'
      )}
    >
      <ErrorIcon className='h-6 w-6 m-[6px] xs:h-8 xs:w-8 xs:m-[10px]' />
      <span className='my-[7px] xs:m-[12px] xl:my-[10px] text-sm xs:text-base font-bold md:text-lg'>
        {message}
      </span>
    </div>
  )
}
