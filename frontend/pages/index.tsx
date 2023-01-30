import Disk from 'components/disk'
import { LayoutAuth } from 'components/layout'

export default function DiskPage() {
  return (
    <>
      {/* <Script src='//cdn.jsdelivr.net/npm/spacingjs' /> */}
      <Disk />
    </>
  )
}
DiskPage.getLayout = function getLayout(page: JSX.Element) {
  return <LayoutAuth>{page}</LayoutAuth>
}

// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }
