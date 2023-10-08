import { useRecoilState } from 'recoil'
import { getDiskData, useFetch } from 'api'
import { driveState, diskLoadingState } from 'store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function useGdrive() {
  const router = useRouter()
  const [drive, setDrive] = useRecoilState(driveState)
  const [diskLoading, setDiskLoading] = useRecoilState(diskLoadingState)
  const { data, isLoading, run } = useFetch(getDiskData)

  useEffect(() => {
    run(router.query.f as string)
  }, [router?.query?.f])

  useEffect(() => {
    setDrive(data)
  }, [data])

  return {
    isLoading: isLoading || diskLoading,
    data: drive,
  }
}
