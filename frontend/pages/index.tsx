import {
  Sort,
  GdriveLikeDisk,
  Operator,
  ImagePlayground,
  UploadTasks
} from 'components/disk'
import { LayoutAuth } from 'components/layout'

import {
  useDisk,
  useGdrive,
  useImageDisplay,
  useDatetime,
  useOperator
} from 'hooks/disk'
import { useScroll } from 'hooks/utils'
import { Loading } from 'components/utils'

export default function DiskPage() {
  const { listMethod, handleListMethod, diskData, isFetching } = useDisk()
  const { root, selected, dragged } = useGdrive()
  const {
    isOpen: ImageDisplayOpen,
    currentIndex,
    handleEscape,
    handleImageDisplay,
    setCurrentIndex
  } = useImageDisplay()

  const { isScrollDown, handleOnScroll } = useScroll()

  const customDatePickerProps = useDatetime()

  const operatorProps = useOperator()

  return (
    <>
      <Sort
        listMethod={listMethod}
        handleListMethod={handleListMethod}
        customDatePickerProps={customDatePickerProps}
      />
      <div
        className='grow overflow-y-auto'
        ref={root}
        onScroll={handleOnScroll}
      >
        {isFetching ? (
          <div className='flex items-center justify-center w-full h-full'>
            <Loading />
          </div>
        ) : (
          <GdriveLikeDisk
            listMethod={listMethod}
            selected={selected}
            dragged={dragged}
            handleImageDisplay={handleImageDisplay}
            data={diskData}
          />
        )}
      </div>
      <Operator operatorProps={operatorProps} isScrollDown={isScrollDown} />
      <UploadTasks
        uploader={operatorProps.uploader}
        handleUploaderClose={operatorProps.handleUploaderClose}
      />
      <ImagePlayground
        data={diskData.files}
        isOpen={ImageDisplayOpen}
        currentIndex={currentIndex}
        handleEscape={handleEscape}
        setCurrentIndex={setCurrentIndex}
      />
    </>
  )
}
DiskPage.getLayout = function getLayout(page: JSX.Element) {
  return <LayoutAuth>{page}</LayoutAuth>
}
