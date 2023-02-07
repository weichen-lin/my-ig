import { useEffect, useState } from 'react'
import { ListMethod } from './type'
import { diskInitState } from 'context/diskData'
import { useRecoilState } from 'recoil'
import { diskStatusInitState } from 'context/diskStatus'
import fethcher from 'api/fetcher'

type listMethodState = 0 | 1

export default function useDisk() {
  const [listMethod, setListMethod] = useState<listMethodState>(
    ListMethod.Lattice
  )
  const [diskData, setDiskData] = useRecoilState(diskInitState)
  const [diskStatus, setDiskStatus] = useRecoilState(diskStatusInitState)

  const handleListMethod = () => {
    if (listMethod === ListMethod.Lattice) {
      setListMethod(ListMethod.List)
    } else {
      setListMethod(ListMethod.Lattice)
    }
  }

  useEffect(() => {
    fethcher
      .get(
        `http://localhost:8080/folder?${new URLSearchParams({
          startDate: diskStatus.startDate.toISOString(),
          endDate: diskStatus.endDate
            ? diskStatus.endDate.toISOString()
            : diskStatus.startDate.toISOString(),
          current_folder: diskStatus.current_folder
        })}`
      )
      .then((res) => setDiskData((prev) => ({ ...prev, folders: res.data })))
      .catch((err) => console.log(err))

    setDiskStatus((prev) => ({ ...prev, isFetching: false }))
  }, [])

  return {
    listMethod,
    handleListMethod,
    diskData,
    isFetching: diskStatus.isFetching
  }
}
