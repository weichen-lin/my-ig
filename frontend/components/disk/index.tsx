import Sort from 'components/disk/sort'
import Files from 'components/disk/files'
import Operator from 'components/disk/operator'
import AddFolderPage from 'components/disk/addfolder'
import ImagePlayground from 'components/disk/images'

import { useDisk, useGdrive, useImageDisplay, useOperator } from 'hooks/disk'

import useScroll from 'hooks/utils/useScroll'

import { FileType } from 'hooks/disk/type'

export default function Disk() {
  const { listMethod, handleListMethod, data } = useDisk()

  const {
    creatFolderOpen,
    toogleCreateFolder,
    operatorOpen,
    toogleOperatorOpen
  } = useOperator()

  const { root, selected, dragged } = useGdrive()

  const { isScrollDown, handleOnScroll } = useScroll()

  const {
    isOpen,
    currentIndex,
    handleEscape,
    handleImageDisplay,
    setCurrentIndex
  } = useImageDisplay()

  return (
    <>
      <Sort listMethod={listMethod} handleListMethod={handleListMethod} />
      <div
        className='grow overflow-y-auto'
        ref={root}
        onScroll={handleOnScroll}
      >
        <Files
          listMethod={listMethod}
          files={data.filter((e) => e.type === FileType.File)}
          folders={data.filter((e) => e.type === FileType.Folder)}
          selected={selected}
          dragged={dragged}
          handleImageDisplay={handleImageDisplay}
        />
      </div>
      <Operator
        toogleCreateFolder={toogleCreateFolder}
        operatorOpen={operatorOpen}
        toogleOperatorOpen={toogleOperatorOpen}
        isScrollDown={isScrollDown}
      />
      <AddFolderPage
        creatFolderOpen={creatFolderOpen}
        toogleCreateFolder={toogleCreateFolder}
      />
      <ImagePlayground
        data={data.filter((e) => e.type === FileType.File)}
        isOpen={isOpen}
        currentIndex={currentIndex}
        handleEscape={handleEscape}
        setCurrentIndex={setCurrentIndex}
      />
    </>
  )
}
