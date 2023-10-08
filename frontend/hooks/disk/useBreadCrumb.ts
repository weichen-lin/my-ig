import { useRecoilState } from 'recoil'
import { getBreadCrumb, useFetch } from 'api'
import { breadcrumbState } from 'store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function useBreadCrumb() {
  const router = useRouter()
  const { data, isLoading, run } = useFetch(getBreadCrumb)
  const [breads, setBreads] = useRecoilState(breadcrumbState)

  useEffect(() => {
    if (!router?.query?.f) {
      setBreads((e) => ({ ...e, breadcrumbs: [], isLoading: false }))
      return
    }
    run(router.query.f as string)
  }, [router?.query?.f])

  useEffect(() => {
    setBreads((e) => ({ ...e, breadcrumbs: data, isLoading: false }))
  }, [data])

  return {
    isLoading,
    data: breads,
  }
}
