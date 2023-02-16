import { useEffect, useState } from 'react'
import { ListMethod } from './type'
import { diskStatusInitState, diskInitState } from 'context'
import { useRecoilState } from 'recoil'
import fethcher from 'api/fetcher'
import { APIS } from 'api/apis'

type listMethodState = 0 | 1

export default function useDisk() {
  const [listMethod, setListMethod] = useState<listMethodState>(
    ListMethod.Lattice
  )
  const [diskStatus, setDiskStatus] = useRecoilState(diskStatusInitState)
  const [diskData, setDiskData] = useRecoilState(diskInitState)
  const diskStatus_copy = JSON.parse(JSON.stringify(diskStatus))
  const [isFetching, setIsFetching] = useState(false)

  const queryParams = {
    current_folder: diskStatus_copy.current_folder.pop() ?? ''
  }

  const handleListMethod = () => {
    if (listMethod === ListMethod.Lattice) {
      setListMethod(ListMethod.List)
    } else {
      setListMethod(ListMethod.Lattice)
    }
  }

  const handleCurrentFolder = (e: string) => {
    const index = diskStatus.current_folder.indexOf(e)
    const new_current_folder = diskStatus.current_folder.slice(0, index + 1)
    setDiskStatus((prev) => ({ ...prev, current_folder: new_current_folder }))
  }

  useEffect(() => {
    setIsFetching(true)
    fethcher
      .get(`${APIS.DISK}?${new URLSearchParams(queryParams)}`)
      .then((res) => {
        const data = res.data
        setDiskData((prev) => ({
          ...prev,
          folders: data.folders,
          files: data.files
        }))
      })
      .catch((err) => {
        console.log(err)
      })
    setIsFetching(false)
  }, [diskStatus.current_folder])

  return {
    listMethod,
    handleListMethod,
    diskData,
    isFetching,
    current_folder: diskStatus.current_folder,
    handleCurrentFolder
  }
}
