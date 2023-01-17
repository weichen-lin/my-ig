import clsx from 'clsx'

export default function AddFolderPageButton(props: {
  name: string
  disable: boolean
  handleOpen: () => void
}) {
  const { name, disable, handleOpen } = props
  return (
    <button
      className={clsx(
        'h-9 w-16 ml-6 rounded-md hover:bg-slate-200',
        'disabled:text-gray-500 disabled:bg-transparent'
      )}
      disabled={disable}
      onClick={handleOpen}
    >
      {name}
    </button>
  )
}
