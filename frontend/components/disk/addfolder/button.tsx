import clsx from 'clsx'

interface ButtonProps {
  name: string
  isRequesting: boolean
  onClick: () => void
}

export default function AddFolderPageButton(props: ButtonProps) {
  const { name, isRequesting, onClick } = props
  return (
    <button
      className={clsx(
        'h-9 w-16 ml-1 xs:ml-4 rounded-md hover:bg-slate-200',
        'disabled:text-gray-500 disabled:bg-transparent',
        'flex items-center justify-center'
      )}
      disabled={isRequesting}
      onClick={onClick}
    >
      {isRequesting ? <div className='btn_loader'></div> : name}
    </button>
  )
}
