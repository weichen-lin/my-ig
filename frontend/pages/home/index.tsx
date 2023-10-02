import { Sort, KushareDrive, Operator, ImagePlayground, UploadTasks, BreadCrumbs, Hinter } from 'components/disk'
import { LayoutHome } from 'components/layout'
import { RecoilRoot, RecoilEnv } from 'recoil'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

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
