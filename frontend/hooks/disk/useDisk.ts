import { useEffect, useState } from 'react'
import { ListMethod } from './type'
import { diskInitState } from 'context/diskData'
import { useRecoilState } from 'recoil'
import { diskStatusInitState } from 'context/diskStatus'
import fethcher from 'api/fetcher'
import { APIS } from 'api/apis'
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
    const diskStatus_copy = JSON.parse(JSON.stringify(diskStatus))

    const startDate = new Date(diskStatus_copy.startDate)
    const endDate = new Date(diskStatus_copy.endDate) || new Date()

    startDate.setUTCHours(0, 0, 0, 0)
    endDate.setUTCHours(23, 59, 59, 999)

    fethcher
      .get(
        `${APIS.FOLDER}?${new URLSearchParams({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          current_folder: diskStatus_copy.current_folder.pop() ?? ''
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
