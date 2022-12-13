import clsx from 'clsx'

interface ButtonProps {
  active: boolean
}

export default function LoginButton() {
  // const { active } = props
  return (
    <div className='relative mx-auto w-full md:w-2/3'>
      <button
        className={clsx(
          'w-full absolute bg-gradient-to-r from-cyan-500/50 to-blue-300/50',
          'rounded-xl p-3 text-lg text-yellow-50 font-black',
          'cursor-pointer active:top-2'
        )}
      >
        Login
      </button>
    </div>
  )
}
