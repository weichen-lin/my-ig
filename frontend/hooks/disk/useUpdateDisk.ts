import { useRecoilState, useRecoilValue } from 'recoil'
import { diskStatusInitState } from 'context/diskStatus'
import { diskInitState } from 'context/diskData'
import fethcher from 'api/fetcher'

export default function useUpdateDisk() {
  const [diskData, setDiskData] = useRecoilState(diskInitState)
  const diskStatus = useRecoilValue(diskStatusInitState)

  const getFolders = (startDate: Date, endDate: Date) => {
    const { current_folder } = diskStatus
    console.log({ startDate, endDate, current_folder })

    fethcher
      .get(
        `http://localhost:8080/folder?${new URLSearchParams({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          current_folder
        })}`
      )
      .then((e) => console.log(e))
      .catch((e) => console.log(e))
  }

  return { getFolders }
}
