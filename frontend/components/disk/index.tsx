import Sort from 'components/disk/sort'
import GdriveLikeDisk from 'components/disk/files'
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
    toogleOperatorOpen,
    isRequesting,
    createFolder,
    folderName,
    handleFolderName,
    errorMsg,
    handleFileUpload
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
        <GdriveLikeDisk
          listMethod={listMethod}
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
        handleFileUpload={handleFileUpload}
      />
      <AddFolderPage
        creatFolderOpen={creatFolderOpen}
        toogleCreateFolder={toogleCreateFolder}
        isRequesting={isRequesting}
        folderName={folderName}
        handleFolderName={handleFolderName}
        createFolder={createFolder}
        errorMsg={errorMsg}
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
