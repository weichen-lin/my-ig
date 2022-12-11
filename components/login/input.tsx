import clsx from 'clsx'

interface InputProps {
  label: string
}

export default function LoginInput(props: InputProps) {
  const { label } = props
  return (
    <div className='w-full h-12 text-xl relative'>
      <input
        className={clsx(
          'absolute top-0 left-0 z-10',
          'w-full h-full rounded-xl bg-transparent border-2 p-3 outline-none',
          'peer',
          'text-gray-600'
        )}
        required
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
