import clsx from 'clsx'
import { ListMethod, listMethodState } from 'store'
import { useIsMobile } from 'hooks/disk'
import { PCButton, MobileButton } from './buttons'
import { AddFolder, Select } from 'components/utils'
import { useRecoilState, useRecoilValue } from 'recoil'
import { SelectedState } from 'store'
import { useFileUpload } from 'hooks/disk'
import { SelectRegion } from 'components/disk'
import { useDialog } from 'hooks/disk'

export default function Operator() {
  const { isMobile } = useIsMobile()
  const { open } = useDialog()
  const selected = useRecoilValue(SelectedState)
  const [method, setMethod] = useRecoilState(listMethodState)
  const { handleFileUpload } = useFileUpload()

  const Buttons = [
    {
      name: 'bx:plus',
      message: '建立',
      onClick: () => {
        open(<Select />)
      },
    },
    {
      name: 'basil:upload-solid',
      message: '上傳',
      onClick: () => handleFileUpload(true),
    },
    {
      name: 'ic:outline-filter-alt',
      message: '設定過濾',
      onClick: () => console.log('filter'),
    },
    {
      name: method > ListMethod.Lattice ? 'mi:list' : 'humbleicons:dashboard',
      message: '調整檢視',
      onClick: () => setMethod(prev => (prev === ListMethod.Lattice ? ListMethod.List : ListMethod.Lattice)),
    },
  ]

  const isSelect = selected.files.length + selected.folders.length > 0

  return (
    <div className={clsx('flex gap-x-4', `${isMobile ? 'order-last ml-auto' : 'w-full justify-start gap-x-4 my-2'}`)}>
      {isSelect ? (
        <SelectRegion />
      ) : (
        Buttons.map((e, index) =>
          isMobile ? (
            <MobileButton name={e.name} onClick={e.onClick} key={`button_${index}`} />
          ) : (
            <PCButton name={e.name} onClick={e.onClick} message={e.message} key={`button_${index}`} />
          ),
        )
      )}
    </div>
  )
}
