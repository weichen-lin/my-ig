import {
  Sort,
  GdriveLikeDisk,
  Operator,
  ImagePlayground,
  UploadTasks
} from 'components/disk'
import { LayoutAuth } from 'components/layout'
import { Loading } from 'components/utils'

import {
  useDisk,
  useGdrive,
  useImageDisplay,
  useDatetime,
  useOperator
} from 'hooks/disk'
import { useScroll } from 'hooks/utils'

export default function DiskPage() {
  const { sortProps, diskProps } = useDisk()
  const { isFetching, diskData, handleCurrentFolder } = diskProps

  const { root, selected, dragged } = useGdrive()

  const { infoProps, tagProps } = useImageDisplay()

  const { isScrollDown, handleOnScroll } = useScroll()

  const customDatePickerProps = useDatetime()

  const operatorProps = useOperator()

  return (
    <>
      <Sort
        sortProps={sortProps}
        customDatePickerProps={customDatePickerProps}
      />
      <div className='overflow-y-auto' onScroll={handleOnScroll} ref={root}>
        {isFetching ? (
          <div className='flex items-center justify-center w-full h-full'>
            <Loading />
          </div>
        ) : (
          <GdriveLikeDisk
            listMethod={sortProps.listMethod}
            selected={selected}
            dragged={dragged}
            handleImageDisplay={infoProps.handleImageDisplay}
            data={diskData}
            handleCurrentFolder={handleCurrentFolder}
          />
        )}
      </div>
      <Operator operatorProps={operatorProps} isScrollDown={isScrollDown} />
      <UploadTasks uploaderProps={operatorProps.uploaderProps} />
      <ImagePlayground
        data={diskData?.files ?? []}
        infoProps={infoProps}
        tagProps={tagProps}
      />
    </>
  )
}
DiskPage.getLayout = function getLayout(page: JSX.Element) {
  return <LayoutAuth>{page}</LayoutAuth>
}
