import clsx from 'clsx'

import { ListMethod } from 'hooks/disk'

import type { DiskProps } from 'hooks/disk'

import { HiOutlinePlusSm } from 'react-icons/hi'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { TbLayoutDashboard } from 'react-icons/tb'
import { MdManageSearch, MdOutlineDriveFolderUpload } from 'react-icons/md'

import { useIsMobile } from 'hooks/disk'

import { PCButton, MobileButton } from './buttons'

import { useContext, useRef, useEffect, createRef } from 'react'
import { IgContext } from 'context'

import { AddFolder } from 'components/utils'

interface SortProps extends Pick<DiskProps, 'sortProps'> {}

export default function Operator(props: SortProps) {
  const { sortProps } = props
  const { listMethod, handleListMethod } = sortProps

  const { isMobile } = useIsMobile()
  const kushareContext = useContext(IgContext)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.select()
    inputRef.current?.focus()
  }, [kushareContext?.openDialog])

  const Bottons = [
    {
      Icon: HiOutlinePlusSm,
      message: '建立',
      onClick: () => {
        kushareContext?.handleCurrentDialog(
          <AddFolder ref={inputRef} close={kushareContext?.handleCloseDialog} />
        )
      },
    },
    {
      Icon: MdOutlineDriveFolderUpload,
      message: '上傳',
      onClick: () => console.log('press button'),
    },
    {
      Icon: MdManageSearch,
      message: '設定過濾',
      onClick: () => console.log('press button'),
    },
    {
      Icon:
        listMethod > ListMethod.Lattice
          ? AiOutlineUnorderedList
          : TbLayoutDashboard,
      message: '調整檢視',
      onClick: handleListMethod,
    },
  ]

  return (
    <div
      className={clsx(
        'flex ml-3',
        `${isMobile ? 'order-last ml-auto' : 'w-full justify-start gap-x-4'}`
      )}
    >
      {Bottons.map((e, index) =>
        isMobile ? (
          <MobileButton
            Icon={e.Icon}
            onClick={e.onClick}
            key={`button_${index}`}
          />
        ) : (
          <PCButton
            Icon={e.Icon}
            onClick={e.onClick}
            message={e.message}
            key={`button_${index}`}
          />
        )
      )}
    </div>
  )
}
