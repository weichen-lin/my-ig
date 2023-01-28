import clsx from 'clsx'
import { ErrorIcon } from 'public/icon/login'

interface InputErrorProps {
  message: string
}

export default function LoginError(props: InputErrorProps) {
  const { message } = props
  return (
    <div
      className={clsx(
        'h-8 text-xl relative mb-8 flex',
        'md:mx-auto bg-red-100 rounded-lg',
        'w-full md:w-2/3 md:h-12'
      )}
    >
      <ErrorIcon className='h-6 w-6 m-1 md:m-2 xl:m-[10px] md:h-8 md:w-8' />
      <span className='my-1 md:m-[10px] xl:my-[10px] text-base font-bold md:text-lg'>
        {message}
      </span>
    </div>
  )
}
