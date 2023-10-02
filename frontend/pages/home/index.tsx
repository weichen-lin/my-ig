import { Sort, KushareDrive, Operator, ImagePlayground, UploadTasks, BreadCrumbs, Hinter } from 'components/disk'
import { LayoutHome } from 'components/layout'
import { RecoilRoot } from 'recoil'

export default function Drive() {
  return (
    <RecoilRoot>
      <LayoutHome>
        <div className='flex flex-col h-[90%]'>
          <div className='flex flex-wrap w-[92%] items-center mx-auto'>
            <Operator />
            <BreadCrumbs />
          </div>
          <KushareDrive />
          <Hinter />
        </div>
      </LayoutHome>
    </RecoilRoot>
  )
}
