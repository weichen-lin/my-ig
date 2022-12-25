import clsx from 'clsx'

interface OptionProps {
  operatorOpen: boolean
  angle: string
  icon?: JSX.Element
  onClick: () => void
}

export default function Option(props: OptionProps) {
  const { operatorOpen, angle, icon, onClick } = props
  console.log(operatorOpen)

  return (
    <li>
      <label
        className={clsx(
          'bg-white border-2 border-gray-500 w-full h-full absolute top-0 left-0',
          'origin-[210%] rounded-full cursor-pointer',
          'transition-all duration-300 ease-in-out',
          'active:top-2',
          `${operatorOpen ? angle : ''}`
        )}
        onClick={(e) => {
          e.preventDefault()
          onClick()
        }}
      >
        <input className='w-full h-full hidden' type='file' />
        {icon}
      </label>
    </li>
  )
}
