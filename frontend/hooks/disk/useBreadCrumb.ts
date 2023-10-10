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
      setBreads([])
      return
    }
    run(router.query.f as string)
  }, [router?.query?.f])

  useEffect(() => {
    setBreads(data)
  }, [data])

  return {
    isLoading,
    data: breads,
  }
}
