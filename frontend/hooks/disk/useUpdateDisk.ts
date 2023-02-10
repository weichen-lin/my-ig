import { useRecoilState, useRecoilValue } from 'recoil'
import { diskStatusInitState } from 'context/diskStatus'
import { diskInitState } from 'context/diskData'
import fethcher from 'api/fetcher'
import { APIS } from 'api/apis'
export default function useUpdateDisk() {
  const [diskData, setDiskData] = useRecoilState(diskInitState)
  const diskStatus = useRecoilValue(diskStatusInitState)

  const getFolders = (startDate: Date, endDate: Date) => {
    const { current_folder } = diskStatus
    console.log({ startDate, endDate, current_folder })

    fethcher
      .get(
        `${APIS.FOLDER}?${new URLSearchParams({
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
