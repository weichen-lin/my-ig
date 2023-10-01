import { Sort, GdriveLikeDisk, Operator, ImagePlayground, UploadTasks, BreadCrumbs, Hinter } from 'components/disk'

import { LayoutHome } from 'components/layout'
import { IgProvider } from 'context'
import { CookieParser, TokenProp } from 'hooks/utils'

import { useDisk, useGdrive, useImageDisplay, useDatetime, useOperator } from 'hooks/disk'
import { useScroll } from 'hooks/utils'

const date = new Date()

export default function DiskPage(props: TokenProp) {
  return (
    <IgProvider token={""} current={""}>
      <LayoutHome>
        <div className='flex flex-col h-[90%]'>
          <div className='flex flex-wrap w-[92%] items-center mx-auto'>
            <Operator />
            <BreadCrumbs />
          </div>
          <GdriveLikeDisk />
          <Hinter />
        </div>
      </LayoutHome>
    </IgProvider>
  )
}
