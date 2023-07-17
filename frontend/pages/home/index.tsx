import { Sort, GdriveLikeDisk, Operator, ImagePlayground, UploadTasks, BreadCrumbs, Hinter } from 'components/disk'

import { LayoutHome } from 'components/layout'
import { IgProvider } from 'context'
import { CookieParser, TokenProp } from 'hooks/utils'

import { useDisk, useGdrive, useImageDisplay, useDatetime, useOperator } from 'hooks/disk'
import { useScroll } from 'hooks/utils'

const date = new Date()

export default function DiskPage(props: TokenProp) {
  // const { sortProps, diskProps } = useDisk()

  // const { isFetching, diskData, handleCurrentFolder } = diskProps

  // const { selected, dragged, hoverHandler } = useGdrive()

  // const { infoProps, tagProps } = useImageDisplay()

  // const { isScrollDown, handleOnScroll } = useScroll()

  // const customDatePickerProps = useDatetime()

  // const operatorProps = useOperator()

  return (
    <IgProvider>
      <LayoutHome>
        <div className='flex flex-col h-[90%] relative'>
          <div className='flex flex-wrap w-[92%] items-center mx-auto'>
            <Operator />
            <BreadCrumbs />
          </div>
          <GdriveLikeDisk
          // selected={selected}
          // dragged={dragged}
          // handleImageDisplay={infoProps.handleImageDisplay}
          // handleCurrentFolder={handleCurrentFolder}
          // hoverHandler={hoverHandler}
          />
          {/* <UploadTasks uploaderProps={operatorProps.uploaderProps} />
      <ImagePlayground
        data={diskData?.files ?? []}
        infoProps={infoProps}
        tagProps={tagProps}
      /> */}
          <Hinter />
        </div>
      </LayoutHome>
    </IgProvider>
  )
}
