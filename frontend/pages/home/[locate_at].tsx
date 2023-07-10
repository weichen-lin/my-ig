import { Sort, GdriveLikeDisk, Operator, ImagePlayground, UploadTasks, BreadCrumbs, Hinter } from 'components/disk'

import { GetServerSideProps } from 'next'

import { LayoutHome } from 'components/layout'
import { IgProvider } from 'context'
import { CookieParser, TokenProp } from 'hooks/utils'

import { useDisk, useGdrive, useImageDisplay, useDatetime, useOperator } from 'hooks/disk'
import { useScroll } from 'hooks/utils'

const date = new Date()

export default function DiskPage(props: TokenProp) {
  const { token } = props

  const { sortProps, diskProps } = useDisk()

  const { isFetching, diskData, handleCurrentFolder } = diskProps

  // const { selected, dragged, hoverHandler } = useGdrive()

  const { infoProps, tagProps } = useImageDisplay()

  const { isScrollDown, handleOnScroll } = useScroll()

  // const customDatePickerProps = useDatetime()

  // const operatorProps = useOperator()

  const isLoading = true

  return (
    <IgProvider token={token}>
      <LayoutHome>
        <div className='flex flex-col h-[90%] relative'>
          <div className='flex flex-wrap w-[92%] items-center mx-auto'>
            <Operator sortProps={sortProps} />
            <BreadCrumbs />
          </div>
          <GdriveLikeDisk
            isLoading={isLoading}
            listMethod={sortProps.listMethod}
            // selected={selected}
            // dragged={dragged}
            handleImageDisplay={infoProps.handleImageDisplay}
            handleCurrentFolder={handleCurrentFolder}
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

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const url = req.url

  const cookie = req.headers.cookie
  const token = CookieParser({ cookie, name: 'my-ig-token' })
  const locate_at = params?.locate_at ?? null

  console.log({ cookie, token, locate_at })

  return {
    props: {
      token,
    },
  }
}
