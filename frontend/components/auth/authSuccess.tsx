import clsx from 'clsx'
import { SuccessIcon } from 'public/icon/login'

interface InputSuccessProps {
  message: string
}

export default function AuthSuccess(props: InputSuccessProps) {
  const { message } = props
  return (
    <div
      className={clsx(
        'h-8 text-xl relative mb-8 flex justify-center',
        'md:mx-auto bg-green-100 rounded-lg',
        'w-full md:w-2/3 xs:h-12'
      )}
    >
      <SuccessIcon className='h-6 w-6 my-[4px] xs:h-8 xs:w-8 xs:m-[10px]' />
      <span className='ml-[6px] my-[6px] xs:m-[12px] xl:my-[10px] text-sm xs:text-lg font-bold md:text-lg'>
        {message}
      </span>
    </div>
  )
}
