import Disk from 'components/disk'
import Layout from 'components/layout'
import Script from 'next/script'

export default function DiskPage() {
  return (
    <>
      {/* <Script src='//cdn.jsdelivr.net/npm/spacingjs' /> */}
      <Disk />
    </>
  )
}
DiskPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }
