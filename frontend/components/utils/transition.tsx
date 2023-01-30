import clsx from 'clsx'

interface TransitionProps {
  switcher: boolean
  children: JSX.Element
}

export default function Transition(props: TransitionProps) {
  const { switcher, children } = props
  return (
    <div
      className={clsx(
        'transition-all ease-in duration-150',
        `${switcher ? 'opacity-100' : 'opacity-100'}`
      )}
    >
      {children}
    </div>
  )
}
