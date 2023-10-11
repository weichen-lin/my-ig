import { useEffect, useState } from 'react'
import { ListMethod } from './type'
import { diskStatusInitState, diskInitState, CurrentFolder } from 'context'
import { useRecoilState } from 'recoil'
import fethcher from 'api/fetcher'

type listMethodState = 0 | 1

export type DiskProps = ReturnType<typeof useDisk>

export default function useDisk() {
  const [listMethod, setListMethod] = useState<listMethodState>(ListMethod.List)
  const [diskStatus, setDiskStatus] = useRecoilState(diskStatusInitState)
  const [diskData, setDiskData] = useRecoilState(diskInitState)
  const diskStatus_copy = JSON.parse(JSON.stringify(diskStatus))
  const [isFetching, setIsFetching] = useState(false)

  const queryParams = {
    current_folder: diskStatus_copy.current_folder.pop()?.folder_uuid ?? '',
  }

  const handleListMethod = () => {
    if (listMethod === ListMethod.Lattice) {
      setListMethod(ListMethod.List)
    } else {
      setListMethod(ListMethod.Lattice)
    }
  }

  const handleBreadChangeFolder = (e: CurrentFolder) => {
    const index = diskStatus.current_folder.indexOf(e)
    const new_current_folder = diskStatus.current_folder.slice(0, index + 1)
    setDiskStatus(prev => ({ ...prev, current_folder: new_current_folder }))
  }

  const handleCurrentFolder = (e: CurrentFolder) => {
    setDiskStatus(prev => ({
      ...prev,
      current_folder: [...prev.current_folder, e],
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fethcher.get(`/disk?${new URLSearchParams(queryParams)}`)
      return res
    }

    setIsFetching(true)

    fetchData()
      .then(res => {
        if (res.status === 200) {
          const data = res.data
          setDiskData(prev => ({
            ...prev,
            folders: data.folders,
            files: data.files,
          }))
        }
      })
      .catch(e => console.log(e))

    setDiskStatus(prev => ({ ...prev, shouldRefresh: false }))
    setIsFetching(false)
  }, [diskStatus.current_folder, diskStatus.shouldRefresh])

  return {
    sortProps: {
      listMethod,
      handleListMethod,
      current_folder: diskStatus.current_folder,
      handleBreadChangeFolder,
    },
    diskProps: {
      diskData,
      isFetching,
      handleCurrentFolder,
    },
  }
}
