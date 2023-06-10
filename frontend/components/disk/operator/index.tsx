import clsx from 'clsx'

import { ListMethod } from 'hooks/disk'

import type { DiskProps } from 'hooks/disk'

import { HiOutlinePlusSm } from 'react-icons/hi'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { TbLayoutDashboard } from 'react-icons/tb'
import { MdManageSearch, MdOutlineDriveFolderUpload } from 'react-icons/md'

import { useIsMobile } from 'hooks/disk'

import { PCButton, MobileButton } from './buttons'

interface SortProps extends Pick<DiskProps, 'sortProps'> {}

export default function Operator(props: SortProps) {
  const { sortProps } = props
  const { listMethod, handleListMethod } = sortProps

  const isMobile = useIsMobile()

  const Bottons = [
    {
      Icon: HiOutlinePlusSm,
      message: '建立',
      onClick: () => console.log('press button'),
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
        'flex',
        `${
          isMobile ? 'order-last ml-auto' : 'w-full justify-start gap-x-4 mt-1'
        }`
      )}
    >
      {Bottons.map((e) =>
        isMobile ? (
          <MobileButton Icon={e.Icon} onClick={e.onClick} />
        ) : (
          <PCButton Icon={e.Icon} onClick={e.onClick} message={e.message} />
        )
      )}
    </div>
  )
}
