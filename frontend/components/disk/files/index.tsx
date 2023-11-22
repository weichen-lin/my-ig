import clsx from 'clsx'
import { File } from 'components/disk/files/files'
import { Folder } from 'components/disk/files/folders'
import { KushareDriveBackbone } from './gdrivebone'
import { Options } from './options'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  listMethodState,
  ListMethod,
  CommonProps,
  fileState,
  folderState,
  SelectedState,
  OpenImageState,
  ContextMenuState,
} from 'store'
import { useGdrive } from 'hooks/disk'
import { ImagePlayground } from 'components/disk/'
import Image from 'next/image'
import { useContext, useRef, useEffect } from 'react'
import { KushareAuth } from 'context'
// import Selectable, { DragStatus } from 'selection'
import { useDrag } from 'hooks/disk'

const EmptyContent = () => {
  const { user } = useContext(KushareAuth)

  return (
    <div className='xss:mt-[25%] md:mt-[3%] 2xl:mt-[10%] flex h-full w-full flex-col items-center gap-y-12'>
      {user?.isValidate ? (
        <>
          <Image src='/static/empty.jpg' width={350} height={300} alt='empty' />
          <div className='text-lg font-bold text-gray-500 px-12'>此位置目前無創建任何資料夾或是上傳任何圖片。</div>
        </>
      ) : (
        <>
          <Image src='/icon/layout/sendmail.gif' width={350} height={300} alt='SendMail' />
          <div className='text-lg font-bold text-gray-500 px-12'>
            為了您帳戶的安全，請盡快前往您的信箱完成驗證程序，謝謝您的配合！
          </div>
        </>
      )}
    </div>
  )
}

export default function KushareDrive() {
  const contextMenu = useRecoilValue(ContextMenuState)
  const listMethod = useRecoilValue(listMethodState)
  const files = useRecoilValue(fileState)
  const folders = useRecoilValue(folderState)
  const { isOpen } = useRecoilValue(OpenImageState)
  const { isLoading } = useGdrive()
  const ref = useRef<HTMLDivElement>(null)
  const setSelected = useSetRecoilState(SelectedState)

  const { isDrag, startDrag, endDrag, currentFolder, setCurrentFolder } = useDrag()

  // useEffect(() => {
  //   if (isLoading) return

  //   const selection = new Selectable({
  //     canStartSelect: true,
  //     boundary: ref?.current as HTMLDivElement,
  //     selectAreaClassName: 'selection-area',
  //     selectablePrefix: 'selectable',
  //     select_cb: s => {
  //       const files = s.stored.filter((e: string) => e.startsWith('file-')).map((e: string) => e.replace('file-', ''))
  //       const folders = s.stored
  //         .filter((e: string) => e.startsWith('folder-'))
  //         .map((e: string) => e.replace('folder-', ''))
  //       setSelected({ files: [...files], folders: [...folders] })
  //     },
  //     drag_cb: (s, status) => {
  //       const files = s?.filter((e: string) => e.startsWith('file-')).map((e: string) => e.replace('file-', ''))
  //       const folders = s?.filter((e: string) => e.startsWith('folder-')).map((e: string) => e.replace('folder-', ''))
  //       console.log({ files, folders })
  //       if (status === DragStatus.Start) {
  //         startDrag()
  //       }

  //       if (status === DragStatus.End) {
  //         endDrag(currentFolder)
  //       }
  //     },
  //   })

  //   return () => selection.destroy()
  // }, [isLoading])

  const haveContent = files?.length > 0 || folders?.length > 0

  return (
    <div ref={ref}>
      {isLoading ? (
        <KushareDriveBackbone />
      ) : haveContent ? (
        <div
          className={clsx(
            'flex w-full select-none flex-col items-start overflow-y-auto px-[5%] xl:px-0 h-full',
            `${listMethod === ListMethod.Lattice ? 'mt-1 gap-y-2 xs:gap-x-6 md:gap-y-3' : ''}`,
          )}
          onContextMenu={e => e.preventDefault()}
        >
          {listMethod === ListMethod.Lattice && folders && folders.length > 0 && (
            <p className='mt-2 text-gray-400'>資料夾</p>
          )}
          <div className='mx-auto flex w-full flex-col items-center gap-x-4 xs:flex-row xs:flex-wrap'>
            {folders?.map((e: CommonProps) => (
              <Folder
                info={e}
                method={listMethod}
                key={`folder_index_${e.id}`}
                isDrag={isDrag}
                targetFolder={currentFolder}
                setTargetFolder={setCurrentFolder}
              />
            ))}
          </div>
          {listMethod === ListMethod.Lattice && files && files.length > 0 && <p className='text-gray-400'>檔案</p>}
          <div className='mx-auto flex w-full flex-col items-center gap-x-4 xs:flex-row xs:flex-wrap'>
            {files?.map((e: CommonProps, index) => (
              <File method={listMethod} info={e} key={`file_${e.id}`} index={index} />
            ))}
          </div>
          {isOpen && <ImagePlayground />}
          {contextMenu.isOpen && <Options />}
        </div>
      ) : (
        <EmptyContent />
      )}
    </div>
  )
}
