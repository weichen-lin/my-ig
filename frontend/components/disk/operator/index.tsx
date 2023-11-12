import clsx from 'clsx'
import { ListMethod, listMethodState } from 'store'
import { useIsMobile } from 'hooks/disk'
import { Dialog } from 'components/utils'
import { PCButton, MobileButton } from './buttons'
import { useRef, useEffect, useState, useCallback } from 'react'
import { AddFolder } from 'components/utils'
import { useRecoilState } from 'recoil'
import { useFileUpload } from 'hooks/disk'

export default function Operator() {
  const { isMobile } = useIsMobile()
  const [openDialog, setOpenDialog] = useState(false)
  const [method, setMethod] = useRecoilState(listMethodState)
  const { handleFileUpload } = useFileUpload()

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false)
  }, [])

  const handlOpenDialog = useCallback(() => {
    setOpenDialog(true)
  }, [])

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.select()
    inputRef.current?.focus()
  }, [openDialog])

  const Buttons = [
    {
      name: 'bx:plus',
      message: '建立',
      onClick: handlOpenDialog,
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

  return (
    <div className={clsx('flex gap-x-4 mt-2', `${isMobile ? 'order-last ml-auto' : 'w-full justify-start gap-x-4'}`)}>
      {Buttons.map((e, index) =>
        isMobile ? (
          <MobileButton name={e.name} onClick={e.onClick} key={`button_${index}`} />
        ) : (
          <PCButton name={e.name} onClick={e.onClick} message={e.message} key={`button_${index}`} />
        ),
      )}
      {openDialog && (
        <Dialog component={<AddFolder ref={inputRef} close={handleCloseDialog} />} close={handleCloseDialog} />
      )}
    </div>
  )
}
