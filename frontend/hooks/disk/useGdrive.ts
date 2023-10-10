import { useRecoilState, useSetRecoilState } from 'recoil'
import { getDiskData, useFetch } from 'api'
import { diskLoadingState, fileState, folderState } from 'store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function useGdrive() {
  const router = useRouter()
  const setFolders = useSetRecoilState(folderState)
  const setFiles = useSetRecoilState(fileState)
  const [diskLoading, setDiskLoading] = useRecoilState(diskLoadingState)
  const { data, isLoading, run } = useFetch(getDiskData)

  useEffect(() => {
    run(router.query.f as string)
    setDiskLoading(isLoading)
  }, [router?.query?.f])

  useEffect(() => {
    setFolders(data?.folders ?? [])
    setFiles(data?.files ?? [])
  }, [data])

  return {
    isLoading: isLoading || diskLoading,
  }
}
